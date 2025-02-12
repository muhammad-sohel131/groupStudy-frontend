import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Updated import
import AuthContext from "../../../context/AuthContext";
import UseAxiosApi from "../../../api/UseAxiosApi";
import {Helmet} from "react-helmet";
import Loading from "../../../Loading/Loading";


export default function LevelAssignments({level}) {
    const levels = {
      easy : "Easiest",
      medium: "Medium",
      hard: "Hardest"
    }

  const [assignments, setAssignments] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosApi = UseAxiosApi();

  // Fetch all assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axiosApi.get(`/assignments?difficulty=${level}`);
        const data = response.data;
        data.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
        setAssignments(data.slice(0,4));
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  // Delete Assignment
  const handleDelete = async (id, creatorEmail) => {
    if(!user){
      toast.warning("Please, Login to Perform this Actions.")
      return
    }
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
    if(!user){
      toast.warning("Please, Login to Perform this Actions.")
      return
    }
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
        <section className="py-16">
            <div className="cs-container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-10">Most Urgent <span className="text-[#F4B503]">{levels[level]}</span> Challenges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                            <div className="p-4 text-left">
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
                                        className="bg-[#F4B503] text-white py-1 px-3 rounded hover:bg-yellow-400"
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
        </section>
    )
}
