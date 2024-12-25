import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      // Placeholder for authentication logic
      if (email === "test@example.com" && password === "password") {
        alert("Login successful");
        navigate('/');
      } else {
        alert("Invalid credentials");
      }
    };
  
    const handleGoogleLogin = () => {
      // Placeholder for Google login logic
      alert("Google login feature coming soon!");
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-2xl text-[#1AA260] font-bold text-center mb-4">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1AA260] hover:bg-[#F4B503] text-white py-2 rounded-md"
            >
              Login
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Login with Google
          </button>
          <p className="text-sm text-center mt-4">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-[#F4B503] cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    );
}
