import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewMessage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/chat/${slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white text-center">
      <h1 className="text-3xl font-bold mb-6">Openly</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">You Have a New Message</h2>

        <button
          onClick={handleOpen}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900"
        >
          Click to Open
        </button>
      </div>
    </div>
  );
}
