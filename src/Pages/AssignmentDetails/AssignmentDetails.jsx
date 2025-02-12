import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import UseAxiosApi from "../../api/UseAxiosApi";
import { Helmet } from "react-helmet";
import Loading from "../../Loading/Loading";

const AssignmentDetails = () => {
    const {user} = useContext(AuthContext)
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState({
    docsLink: "",
    note: "",
  });
  const axiosApi = UseAxiosApi();
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axiosApi.get(`/assignments/${id}`, {
          withCredentials: true,
        });
        setAssignment(response.data);
      } catch (error) {
        console.error("Error fetching assignment:", error);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleSubmit = async () => {
    if (!submission.docsLink) {
      toast.error("Google Docs link is required.");
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      ...submission,
      assignmentId: id,
      status: "pending",
      userEmail: user.email,
      title: assignment.title,
      marks: assignment.marks,
      name: user.displayName
    };

    try {
      const response = await axiosApi.post("/submissions", submissionData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    
      if (response.status === 200 || response.status === 201) {
        toast.success("Assignment submitted successfully!");
      } else {
        throw new Error("Failed to submit assignment.");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("Failed to submit assignment.");
    }
    
    finally {
      setIsSubmitting(false);
    }
  };

  if (!assignment) return <Loading />;

  return (
    <div className="cs-container mx-auto px-4 py-6 my-10 bg-white text-gray-800 shadow-md rounded-md">
      <Helmet>
        <title>{assignment.title} - Group Study</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-gray-800">{assignment.title}</h2>
      <img
        src={assignment.thumbnail}
        alt={assignment.title}
        className="w-full h-60 object-contain mt-4"
      />
      <p className="mt-4">{assignment.description}</p>
      <p className="mt-2 font-medium text-gray-700">Marks: {assignment.marks}</p>
      <p className="mt-2 font-medium text-gray-700">
        Difficulty: {assignment.difficulty}
      </p>
      <button
        onClick={() => setIsSubmitting(!isSubmitting)}
        className="mt-6 bg-[#1AA260] text-white py-2 px-4 rounded hover:bg-[#138c4e]"
      >
        Take Assignment
      </button>

      {isSubmitting && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Submit Assignment</h3>
          <input
            type="url"
            value={submission.docsLink}
            onChange={(e) => setSubmission({ ...submission, docsLink: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Enter Google Docs link"
            required
          />
          <textarea
            value={submission.note}
            onChange={(e) => setSubmission({ ...submission, note: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded mt-4"
            placeholder="Add a quick note (optional)"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-[#1AA260] text-white py-2 px-4 rounded hover:bg-[#138c4e]"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignmentDetails;
