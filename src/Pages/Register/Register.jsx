import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { updateProfile } from "firebase/auth";
import { Helmet } from 'react-helmet';
import { imageUpload } from '../../utils/imageUpload';

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const minLength = password.length >= 6;
    return upperCase && lowerCase && minLength;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    // Validate password
    if (!validatePassword(password)) {
      toast.error(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    imageUpload(image)
      .then(res => {
        console.log(res.data)
        const imageUrl = res.data.display_url
        console.log(imageUrl)
        // Perform registration
        createUser(email, password)
          .then((result) => {
            const user = result.user;

            // Update user profile with display name
            updateProfile(user, {
              displayName: name || "New User",
              photoURL: imageUrl
            })
              .then(() => {
                toast.success("Registration successful!");
                console.log("User registered with profile:", user);
                navigate("/login");
              })
              .catch((err) => {
                console.error("Profile update error:", err);
                toast.error("Failed to update profile.");
              });
          })
          .catch((err) => {
            console.error("Registration error:", err);
            if (err.code === "auth/email-already-in-use") {
              toast.error("Email is already registered.");
            } else if (err.code === "auth/weak-password") {
              toast.error("Password is too weak.");
            } else {
              toast.error("Something went wrong. Please try again.");
            }
          });
      })
      .catch(err => {
        console.log(err)
      })

  };


  return (
    <div className="flex cs-container justify-center items-center py-10">
      <Helmet>
        <title>Register - Group Study</title>
      </Helmet>
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#1AA260]">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-md text-gray-700"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md text-gray-700"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Upload Photo</label>
            <input onChange={handleImageChange} className='rounded-lg border border-[#e57339] mb-5 p-2' type="file" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md text-gray-700"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1AA260] text-white py-2 rounded-md hover:bg-[#F4B606] transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-black text-center mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#F4B606] cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
