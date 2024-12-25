import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  // Fetch all assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://localhost:3000/assignments");
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  // Delete Assignment
  const handleDelete = async (id, creatorEmail) => {
   
    if (creatorEmail !== user.email) {
      toast.error("You are not authorized to delete this assignment.");
      return;
    }

    const confirm = window.confirm("Are you sure you want to delete this assignment?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:3000/assignments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAssignments(assignments.filter((assignment) => assignment._id !== id));
        toast.success("Assignment deleted successfully!");
      } else {
        throw new Error("Failed to delete assignment.");
      }
    } catch (error) {
      toast.error("Error deleting assignment.");
      console.error(error);
    }
  };

  // Navigate to Update Page
  const handleUpdate = (id, creatorEmail) => {
    if (creatorEmail !== user.email) {
      toast.error("You are not authorized to update this assignment.");
      return;
    }
    navigate(`/update-assignment/${id}`);
  };

  // Navigate to View Page
  const handleView = (id) => {
    navigate(`/assignments/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Assignments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment._id}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            <img
              src={assignment.thumbnail}
              alt={assignment.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{assignment.title}</h3>
              <p className="text-sm text-gray-600">{assignment.description}</p>
              <p className="mt-2 text-gray-800 font-medium">Marks: {assignment.marks}</p>
              <p className="text-gray-800 font-medium">
                Difficulty: <span className="capitalize">{assignment.difficulty}</span>
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(assignment._id, assignment.email)}
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(assignment._id, assignment.email)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400"
                >
                  Update
                </button>
                <button
                  onClick={() => handleView(assignment._id)}
                  className="bg-[#1AA260] text-white py-1 px-3 rounded hover:bg-[#138c4e]"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
