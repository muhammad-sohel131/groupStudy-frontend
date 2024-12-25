import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AuthContext from "../../context/AuthContext";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const { user } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !marks || !thumbnail || !difficulty || !dueDate) {
      toast.error("All fields are required!");
      return;
    }

    const assignmentData = {
      title,
      description,
      marks: parseInt(marks, 10),
      thumbnail,
      difficulty,
      dueDate: dueDate.toISOString(),
      email: user.email,
      name: user.displayName
    };

    try {
      const response = await fetch("http://localhost:3000/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentData),
      });
      console.log(response)
      if (response.ok) {
        toast.success("Assignment created successfully!");
        navigate("/assignments");
      } else {
        throw new Error("Failed to create assignment");
      }
    } catch (error) {
      toast.error("Error creating assignment");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter assignment title"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter assignment description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Marks</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter marks"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Thumbnail Image URL</label>
          <input
            type="url"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Difficulty Level</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            className="w-full p-2 border border-gray-300 rounded-md"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select due date"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#1AA260] text-white py-2 px-4 rounded-md hover:bg-[#138c4e] transition duration-200"
        >
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
