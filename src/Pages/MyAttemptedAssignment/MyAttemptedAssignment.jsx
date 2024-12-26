import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const MyAttemptedAssignment = () => {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = user.email;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `https://group-study-backend-six.vercel.app/submissions?email=${userEmail}`,
          {
            withCredentials: true,
          }
        );        
        setAssignments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-brand font-semibold">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-brand mb-6">My Submitted Assignments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-brand text-black">
            <tr>
              <th className="text-left px-6 py-4 font-medium uppercase">Title</th>
              <th className="text-left px-6 py-4 font-medium uppercase">Status</th>
              <th className="text-left px-6 py-4 font-medium uppercase">Total Marks</th>
              <th className="text-left px-6 py-4 font-medium uppercase">Obtained Marks</th>
              <th className="text-left px-6 py-4 font-medium uppercase">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr
                key={assignment._id}
                className="border-b text-gray-800 hover:bg-gray-100 transition duration-150"
              >
                <td className="px-6 py-4">{assignment.title}</td>
                <td className="px-6 py-4">{assignment.status}</td>
                <td className="px-6 py-4">{assignment.marks}</td>
                <td className="px-6 py-4">
                  {assignment.obtainedMarks || "Waiting"}
                </td>
                <td className="px-6 py-4">
                  {assignment.feedback || "No Feedback Yet"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAttemptedAssignment;
