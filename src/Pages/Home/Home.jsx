import React from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
              <title>Home - Group Study</title>
            </Helmet>
      {/* Banner Section */}
      <section className="bg-[#1AA260] text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Group Study</h1>
          <p className="text-lg mb-6">
            Collaborate, learn, and grow with our platform. Simplifying group studies and assignments.
          </p>
          <button className="bg-white text-[#1AA260] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white text-gray-600 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Easy Assignment Management</h3>
              <p>Track, submit, and manage assignments effortlessly in one place.</p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white text-gray-600 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Collaboration Tools</h3>
              <p>Work seamlessly with your group members with real-time collaboration features.</p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white text-gray-600 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Secure Login</h3>
              <p>Enhanced security with token-based authentication and user verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 text-gray-800 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* FAQ 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg mb-2">What is Group Study?</h3>
              <p>Group Study is a platform designed to help students collaborate on assignments and group studies effectively.</p>
            </div>
            {/* FAQ 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg mb-2">How do I submit assignments?</h3>
              <p>You can submit assignments by logging in, navigating to the assignments page, and uploading your submission.</p>
            </div>
            {/* FAQ 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg mb-2">Is my data secure?</h3>
              <p>Yes, we use industry-standard security protocols to protect your data and ensure privacy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
