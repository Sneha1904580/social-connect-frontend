import React, { useState, useContext } from "react";
import userContext from "../context/userContext";

export default function Createpost() {
  const { handleCreatePost } = useContext(userContext);

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [media, setMedia] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("location", location);

     
      if (media.length > 0) {
        media.forEach((file) => {
          formData.append("media", file);
        });
      }

      await handleCreatePost(formData);

    
      setCaption("");
      setLocation("");
      setMedia([]);

    } catch (error) {
      console.log("CREATE POST ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100">
      <div className="flex flex-col gap-6 border border-gray-300 p-8 justify-center items-center rounded-3xl bg-white shadow-lg">
        
        <h1 className="text-3xl font-bold text-purple-600">
          Create Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

       
          <textarea
            placeholder="Enter your Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

       
          <input
            type="file"
            name="media"
            multiple
            onChange={(e) => setMedia(Array.from(e.target.files))} // ✅ FIX
            className="w-full p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

         
          <div className="flex flex-col gap-1">
            {media.length > 0 &&
              media.map((file, index) => (
                <p key={index} className="text-sm text-gray-500">
                  {file.name}
                </p>
              ))}
          </div>

      
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}