import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function AllPost() {
  const { posts, getAllPosts, handleLike } = useContext(UserContext);

  useEffect(() => {
    getAllPosts();
  }, []);
  console.log("test")

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">All Posts</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {posts.map((post) => (
          <div key={post._id} className="w-80 bg-white rounded-xl shadow-md p-4 border border-purple-200">
            <h3 className="font-semibold text-purple-700">{post.user?.name}</h3>
            <p className="text-gray-600">{post.caption}</p>

            {post.media?.map((m, i) => (
              <div key={i} className="mt-3">
                {m.mediaType === "image" ? (
                  <img src={m.mediaUrl} alt="post" className="w-full h-52 object-cover rounded-lg" />
                ) : (
                  <video src={m.mediaUrl} controls className="w-full h-52 object-cover rounded-lg" />
                )}
              </div>
            ))}

            <p className="text-sm text-gray-500 mt-2">{post.location}</p>

            <div className="flex justify-between mt-3 text-sm font-medium">
              <button onClick={() => handleLike(post._id)} className="text-rose-500">
                ❤️ {post.likesCount}
              </button>
              <Link to={`/post/${post._id}`} className="text-blue-500 underline">
                View Post
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}