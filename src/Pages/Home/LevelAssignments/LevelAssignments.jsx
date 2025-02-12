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
                            className="bg-white p-4 relative shadow-md rounded-md overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={assignment.thumbnail}
                                alt={assignment.title}
                                className="h-40 w-full rounded-md"
                            />
                            <div className="text-left pt-4">
                                <h3 className="text-lg font-bold text-gray-800">{assignment.title}</h3>
                                <p className="text-sm text-gray-600">{assignment.description}</p>
                                <p className="mt-2 text-gray-800 font-medium">Marks: {assignment.marks}</p>
                                <p className="text-gray-800 font-medium mb-10">
                                    Difficulty: <span className="capitalize">{assignment.difficulty}</span>
                                </p>
                                <div className="mt-4 absolute left-[50%] -translate-x-[50%] w-[calc(100%-1rem)] bottom-4 flex gap-2">
                                    <button
                                        onClick={() => handleView(assignment._id)}
                                        className="bg-[#1AA260] text-white py-1 px-3 w-full rounded hover:bg-[#138c4e]"
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
