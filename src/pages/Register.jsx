import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";

export default function Register() {

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const { handleRegister } = useContext(userContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await handleRegister(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-gray-200">

        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Create Account
        </h2>

        <p className="text-gray-500 text-sm text-center mb-6">
          Sign up to get started
        </p>

     
        <div className="mb-4 text-left">
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       
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

        <div className="mb-4 text-left">
          <label className="text-sm text-gray-600">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
          />
        </div>

       
        <div className="mb-6 text-left">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md"
        >
          Create Account
        </button>

       
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?
          </p>
          <Link to="/">
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
              Sign In
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}