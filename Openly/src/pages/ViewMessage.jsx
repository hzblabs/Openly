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

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">You have a new message</h2>

        <button
          onClick={handleOpen}
          className="bg-black text-white w-full py-2 rounded-xl hover:bg-gray-900"
        >
          Click to Open
        </button>
      </div>
    </div>
  );
}
