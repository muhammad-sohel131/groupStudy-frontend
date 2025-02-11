import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import UseAxiosApi from "../../api/UseAxiosApi";
import { Helmet } from "react-helmet";
import axios from "axios";

const PendingAssignments = () => {
  const { user } = useContext(AuthContext);
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const userEmail = user.email;

  const axiosApi = UseAxiosApi();


  useEffect(() => {
    const fetchPendingAssignments = async () => {
      try {
        const response = await axiosApi.get(
          `/submissions?status=pending`,
          {
            withCredentials: true
          }
        );
        const filteredAssignments = response.data.filter(
          (assignment) => assignment.userEmail !== userEmail
        );
        setPendingAssignments(filteredAssignments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pending assignments:", error);
        setLoading(false);
      }
    };

    fetchPendingAssignments();
  }, [userEmail]);

  const handleGiveMarks = async () => {
    if (!marks || !feedback) {
      alert("Please fill in both marks and feedback!");
      return;
    }
    try {
      await axiosApi.patch(
        `/submissions/${selectedAssignment._id}`,
        {
          obtainedMarks: marks,
          feedback,
          status: "completed",
        },
        {
          withCredentials: true
        }
      );
      alert("Marks submitted successfully!");
      setPendingAssignments((prev) =>
        prev.filter((assignment) => assignment._id !== selectedAssignment._id)
      );
      setSelectedAssignment(null);
    } catch (error) {
      console.error("Error submitting marks:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-brand font-semibold">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Helmet>
        <title>Pending Assignments - Group Study</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-brand mb-6">Pending Assignments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-brand text-black">
            <tr>
              <th className="text-left px-6 py-4 font-medium uppercase">Title</th>
              <th className="text-left px-6 py-4 font-medium uppercase">Marks</th>
              <th className="text-left px-6 py-4 font-medium uppercase">Examinee Name</th>
              <th className="text-left px-6 py-4 font-medium uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingAssignments.map((assignment) => (
              <tr
                key={assignment._id}
                className="border-b text-gray-800 hover:bg-gray-100 transition duration-150"
              >
                <td className="px-6 py-4">{assignment.title}</td>
                <td className="px-6 py-4">{assignment.marks}</td>
                <td className="px-6 py-4">{assignment.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedAssignment(assignment)}
                    className="bg-brand text-black px-4 py-2 rounded hover:bg-brand-dark"
                  >
                    Give Marks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Marks Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-brand">Evaluate Assignment</h3>
            <p>
              <a
                href={selectedAssignment.docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Open Google Docs
              </a>
            </p>
            <p className="mt-2">
              <strong>Notes:</strong> {selectedAssignment.note}
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Marks</label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              ></textarea>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleGiveMarks}
                className="bg-brand text-black px-4 py-2 rounded hover:bg-brand-dark mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAssignments;
