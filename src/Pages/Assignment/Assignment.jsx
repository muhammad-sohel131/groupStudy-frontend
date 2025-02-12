import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Updated import
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import UseAxiosApi from "../../api/UseAxiosApi";
import {Helmet} from "react-helmet";
import Loading from "../../Loading/Loading";

const Assignments = () => {
  const [difficulty, setDifficulty] = useState('');
  const [search, setSearch] = useState('');

  const [assignments, setAssignments] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosApi = UseAxiosApi();

  // Fetch all assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axiosApi.get(`/assignments?difficulty=${difficulty}&search=${search}`);
        const data = response.data;
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [difficulty, search]);

  // Delete Assignment
  const handleDelete = async (id, creatorEmail) => {
    if (creatorEmail !== user.email) {
      toast.error("Only Owner can delete this!");
      return;
    }

    const confirm = window.confirm("Are you sure you want to delete this assignment?");
    if (!confirm) return;

    try {
      const response = await axiosApi.delete(`/assignments/${id}`, {
        withCredentials: true
      })
      
      if (response.status === 200) {
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
      toast.error("Only Owner can update it!");
      return;
    }
    navigate(`/update-assignment/${id}`);
  };

  // Navigate to View Page
  const handleView = (id) => {
    navigate(`/assignments/${id}`);
  };

  if(!assignments.length){
    return <Loading />
  }
  return (
    <div className="cs-container mx-auto py-6">
      <Helmet>
        <title>Assignments - Group Study</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6">All Assignments</h2>
      {/* Filter and Search Section */}
      <div className="p-6 mb-10 bg-gray-100 rounded-md shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-1/3">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
              Filter by Difficulty:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 p-3 focus:border-blue-500 sm:text-sm text-black"
            >
              <option value="">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="w-full sm:w-2/3">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search by Title:
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search assignments"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm text-black focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <motion.div
            key={assignment._id}
            className="bg-white shadow-md rounded-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={assignment.thumbnail}
              alt={assignment.title}
              className="h-40 w-full object-contain"
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
