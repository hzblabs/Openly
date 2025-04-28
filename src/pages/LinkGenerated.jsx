import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function LinkGenerated() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [linkCopied, setLinkCopied] = useState(false);
  const [canJoinChat, setCanJoinChat] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "conversations", slug, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());

      if (messages.length > 1) {
        // Receiver has replied
        setCanJoinChat(true);
      }
    });

    return () => unsubscribe();
  }, [slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/view/${slug}`);
    setLinkCopied(true);
  };

  const handleEnterChat = () => {
    navigate(`/chat/${slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white text-center">
      <h1 className="text-3xl font-bold mb-6">Openly</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        {!canJoinChat ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Your link is ready!</h2>

            <div className="bg-gray-100 p-3 rounded-xl mb-4 break-words">
              {`${window.location.origin}/view/${slug}`}
            </div>

            <button
              onClick={copyLink}
              className="bg-black text-white w-full py-2 rounded-xl hover:bg-gray-900 mb-4"
            >
              {linkCopied ? "Link Copied!" : "Copy Link"}
            </button>

            <p className="text-sm text-gray-600">
              Share this link. You can start chatting after the receiver replies
              🙂
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-6">
              Your message has been responded, visit the chat!
            </h2>

            <button
              onClick={handleEnterChat}
              className="bg-black text-white w-full py-2 rounded-xl hover:bg-gray-900"
            >
              Open Chat
            </button>
          </>
        )}
      </div>
    </div>
  );
}
