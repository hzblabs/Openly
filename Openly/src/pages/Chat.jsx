import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Chat() {
  const { slug } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sender, setSender] = useState("");
  const [choosingRole, setChoosingRole] = useState(true);
  const [chatUnlocked, setChatUnlocked] = useState(false);

  useEffect(() => {
    if (!chatUnlocked) return;

    const q = query(
      collection(db, "conversations", slug, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [slug, chatUnlocked]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "conversations", slug, "messages"), {
      sender: sender,
      content: newMessage,
      createdAt: serverTimestamp(),
    });

    setNewMessage("");
  };

  const handleChooseSender = (role) => {
    setSender(role);
    setChoosingRole(false);
  };

  const handleUnlockChat = () => {
    setChatUnlocked(true);
  };

  if (choosingRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-bold mb-6">Openly</h1>
        <p className="mb-4">Who are you?</p>
        <div className="flex gap-4">
          <button
            onClick={() => handleChooseSender("initiator")}
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-900"
          >
            I'm the Sender
          </button>
          <button
            onClick={() => handleChooseSender("receiver")}
            className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-900"
          >
            I'm the Receiver
          </button>
        </div>
      </div>
    );
  }

  if (!chatUnlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
        <h1 className="text-3xl font-bold mb-6">Openly</h1>
        <p className="mb-4">You have a message waiting.</p>
        <button
          onClick={handleUnlockChat}
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900"
        >
          Open Chat
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Openly</h1>

      <div className="w-full max-w-md flex-1 bg-gray-50 rounded-xl p-4 mb-4 overflow-y-auto max-h-[60vh]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 p-3 rounded-xl max-w-xs ${
              msg.sender === sender
                ? "ml-auto bg-black text-white"
                : "mr-auto bg-gray-200 text-black"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your reply..."
          className="flex-1 p-2 border rounded-xl"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}
