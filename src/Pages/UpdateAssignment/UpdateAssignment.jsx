import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosApi from "../../api/UseAxiosApi";
import { Helmet } from "react-helmet";
import Loading from "../../Loading/Loading";

const UpdateAssignment = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [marks, setMarks] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const navigate = useNavigate();
    const axiosApi = UseAxiosApi();

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await axiosApi.get(`/assignments/${id}`, {
                    withCredentials: true,
                  });
                const assignment = response.data;

                setTitle(assignment.title);
                setDescription(assignment.description);
                setMarks(assignment.marks);
                setThumbnail(assignment.thumbnail);
                setDifficulty(assignment.difficulty);
                setDueDate(new Date(assignment.dueDate));

                setLoading(false);
            } catch (err) {
                console.error("Error fetching assignment:", err);
                toast.error("Failed to load assignment data.");
                setLoading(false);
            }
        };

        fetchAssignment();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !description || !marks || !thumbnail || !difficulty || !dueDate) {
            toast.error("All fields are required!");
            return;
        }

        const updatedAssignment = {
            title,
            description,
            marks: parseInt(marks, 10),
            thumbnail,
            difficulty,
            dueDate: dueDate.toISOString(),
            email: user.email,
            name: user.displayName,
        };

        try {
            const response = await axiosApi.put(`/assignments/${id}`, updatedAssignment, {
                withCredentials: true,
              });

            if (response.status === 200) {
                toast.success("Assignment updated successfully!");
                navigate("/assignments");
            } else {
                throw new Error("Failed to update assignment");
            }
        } catch (err) {
            console.error("Error updating assignment:", err);
            toast.error("Failed to update the assignment. Please try again.");
        }
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div className="cs-container my-10 mx-auto p-6 text-gray-900 bg-white shadow-md rounded-md">
            <Helmet>
                    <title>Update Assignment - Group Study</title>
                  </Helmet>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Assignment</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter assignment title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter assignment description"
                        required
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
                        required
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
                        required
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
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200"
                >
                    Update Assignment
                </button>
            </form>
        </div>
    );
};

export default UpdateAssignment;
