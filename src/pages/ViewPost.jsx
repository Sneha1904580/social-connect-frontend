import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/userContext";
import axios from "axios";

export default function ViewPost() {
  const { postId } = useParams();
  const { handleLike: globalHandleLike } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const BaseUrl = import.meta.env.VITE_BASE_URL;

 
  const getPost = async () => {
    try {
      const res = await axios.get(`${BaseUrl}api/posts/${postId}`, {
        withCredentials: true, 
      });
      setPost(res.data.data);
    } catch (error) {
      console.log("Error fetching post:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

const handleLike = async () => {
  try {
    const updatedPost = await globalHandleLike(post._id);
    if (updatedPost) setPost(updatedPost); 
  } catch (error) {
    console.log("Error liking post:", error);
  }
};
const handleDelete = async () => {
  try {
    const res = await axios.delete(`${BaseUrl}api/posts/delete/${post._id}`, {
      withCredentials: true,
    });

    alert(res.data.message);

    // redirect after delete
    window.location.href = "/"; 

  } catch (error) {
    console.log("Error deleting post:", error.response?.data || error.message);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white p-5 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-purple-600">{post.user?.name}</h2>
        <p className="mt-2">{post.caption}</p>

        {post.media?.map((m, i) => (
          <div key={i} className="mt-3">
            {m.mediaType === "image" ? (
              <img src={m.mediaUrl} alt="post" className="w-full rounded-lg" />
            ) : (
              <video src={m.mediaUrl} controls className="w-full rounded-lg" />
            )}
          </div>
        ))}

        <p className="text-gray-500 mt-2">{post.location}</p>

        <button
          className="text-red-500 mt-3 font-semibold"
          onClick={handleLike}
        >
          ❤️ {post.likesCount}
        </button>
        {post.user?._id === post.userId && (
  <button
    className="bg-red-500 text-white px-4 py-2 rounded mt-3 ml-3"
    onClick={handleDelete}
  >
    Delete
  </button>
)}
      </div>
    </div>
  );
}