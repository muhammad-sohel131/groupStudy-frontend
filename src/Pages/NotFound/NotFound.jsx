import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-[#F4B606] mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/">
          <button className="bg-[#F4B606] text-white px-6 py-3 rounded-lg font-medium">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
