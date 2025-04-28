import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateMessage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const slug = uuidv4().slice(0, 8);

      await setDoc(doc(db, "conversations", slug), {
        createdAt: serverTimestamp(),
      });

      await addDoc(collection(db, "conversations", slug, "messages"), {
        sender: "initiator",
        content: message,
        createdAt: serverTimestamp(),
      });

      navigate(`/link-generated/${slug}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Write Your Honest Message
      </h1>
      <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-lg p-6">
        <textarea
          className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-black"
          placeholder="Be real. Say what matters."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        ></textarea>

        <button
          onClick={handleGenerate}
          className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-900 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Link"}
        </button>
      </div>
    </div>
  );
}
