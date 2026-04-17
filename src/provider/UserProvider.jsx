import React, { useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

axios.defaults.withCredentials = true;

const UserProvider = ({ children }) => {
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // for auth

  const handleLogin = async (formData) => {
    try {
      const res = await axios.post(`${BaseUrl}api/auth/login`, formData);
      setUser(res.data.data);
      alert(res.data.message);
    } catch (error) {
      console.log("Error logging in:", error.response?.data || error);
    } 
  };

  const handleRegister = async(formData)=>{
    try{
      const res = await axios.post(`${BaseUrl}api/auth/register`, formData);
      alert(res.data.message);
    } catch (error) {
      console.log("Error registering user:", error.response?.data || error);
    }
  }

  const getAllPosts = async () => {
    try {
      const res = await axios.get(`${BaseUrl}api/posts/all`);
      setPosts(res.data.data);
    } catch (error) {
      console.log("Error fetching posts:", error.response?.data || error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await axios.put(`${BaseUrl}api/posts/like/${postId}`);
      if (!res?.data?.data) return;

      const updatedPost = res.data.data;

      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === postId ? updatedPost : p))
      );

      return updatedPost;
    } catch (error) {
      console.log("Error liking post:", error.response?.data || error);
    }
  };

  const handleCreatePost = async (formData) => {
    try {
      const res = await axios.post(`${BaseUrl}api/posts/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPosts((prev) => [res.data.data, ...prev]);
      return res.data.data;
    } catch (error) {
      console.log("Error creating post:", error.response?.data || error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${BaseUrl}api/posts/delete/${postId}`);

      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
    } catch (error) {
      console.log("Error deleting post:", error.response?.data || error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        posts,
        user,
        setUser,
        getAllPosts,
        handleLogin,
        handleRegister,
        handleLike,
        handleCreatePost,
        handleDeletePost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;