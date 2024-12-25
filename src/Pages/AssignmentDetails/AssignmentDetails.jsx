import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const AssignmentDetails = () => {
    const {user} = useContext(AuthContext)
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState({
    docsLink: "",
    note: "",
  });

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`http://localhost:3000/assignments/${id}`);
        const data = await response.json();
        setAssignment(data);
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
      marks: assignment.marks
    };

    try {
      const response = await fetch("http://localhost:3000/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        toast.success("Assignment submitted successfully!");
      } else {
        throw new Error("Failed to submit assignment.");
      }
    } catch (error) {
      toast.error("Error submitting assignment.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!assignment) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800">{assignment.title}</h2>
      <img
        src={assignment.thumbnail}
        alt={assignment.title}
        className="w-full h-60 object-cover mt-4"
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
