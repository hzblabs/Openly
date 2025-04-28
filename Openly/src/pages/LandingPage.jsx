import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate("/create");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-white to-gray-100">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          Welcome to Openly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-base md:text-lg text-gray-600 max-w-lg md:max-w-2xl mb-8"
        >
          The first messaging platform that respects honesty. No previews. No
          ghosting. No games. Just pure conversation.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTryNow}
          className="bg-black text-white px-8 py-3 md:px-10 md:py-4 rounded-xl text-base md:text-lg hover:bg-gray-900 transition"
        >
          Try Now
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center mb-12"
        >
          Why Openly?
        </motion.h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {["No Message Previews", "No Ghosting", "Self-Destruct System"].map(
            (title, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="p-6 bg-gray-100 rounded-2xl shadow-md text-center"
              >
                <h3 className="text-lg md:text-xl font-semibold mb-4">
                  {title}
                </h3>
                <p className="text-sm md:text-base">
                  {title === "No Message Previews"
                    ? "Messages remain locked until opened, ensuring pure intentionality."
                    : title === "No Ghosting"
                    ? "Conversations expire if ignored, preserving emotional trust."
                    : "Chats auto-delete after inactivity — no emotional baggage."}
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center mb-12"
        >
          How It Works
        </motion.h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {["Write a message", "Send the link", "Chat openly"].map(
            (step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="bg-black text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full mb-4 text-lg font-bold">
                  {i + 1}
                </div>
                <p className="text-sm md:text-base">{step}</p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs md:text-sm text-gray-500">
        Built with honesty. © {new Date().getFullYear()} Openly.
      </footer>
    </div>
  );
}
