import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import userContext from "../context/UserContext";

export default function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { handleLogin } = useContext(userContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await handleLogin(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-gray-200">

        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          Login to your account
        </p>

      
        <div className="mb-4 text-left">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-6 text-left">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md"
        >
          Sign In
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don’t have an account?
          </p>
          <Link to="/register">
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
              Create Account
            </span>
          </Link>
        </div>

      </div>
    </div>
  )
}