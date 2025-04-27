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

      // Redirect to waiting page with slug
      navigate(`/link-generated/${slug}`);
    } catch (error) {
      console.error("Error creating conversation:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <h1 className="text-3xl font-bold mb-6">Openly</h1>

      <div className="w-full max-w-md shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Write a Message</h2>

        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Be real. Say what matters."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        ></textarea>

        <button
          onClick={handleGenerate}
          className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-900 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Link"}
        </button>
      </div>
    </div>
  );
}
