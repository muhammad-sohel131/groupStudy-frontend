import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import UseAxiosApi from '../../api/UseAxiosApi';

export default function Login() {
  const { singInWithGoogle, singInUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state || '/';

  const axiosApi = UseAxiosApi();
  const handleLogin = (e) => {
    e.preventDefault();
    singInUser(email, password)
      .then(e => {
        const user = {
          email: e.user.email
        };
        axiosApi.post('/jwt', user, { withCredentials: true })
          .then(res => {
            navigate(form);
            toast.success('Login Success!')
          })
      })
      .catch(err => {
        console.log(err)
        toast.error("Wrong Credential!")
      })
  };

  const handleGoogleLogin = () => {
    singInWithGoogle()
      .then((e) => {
        const user = {
          email: e.user.email
        };
        axiosApi.post('/jwt', user, { withCredentials: true })
          .then(res => {
            toast.success("Loged in successfully!")
            navigate(form)
          })
      })
      .catch(err => {
        console.log(err.message);
        toast.error("Something Wrong")
      })
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl text-[#1AA260] font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md text-black"
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
              className="w-full px-3 py-2 border rounded-md text-black"
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
        <p className="text-sm text-black text-center mt-4">
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
