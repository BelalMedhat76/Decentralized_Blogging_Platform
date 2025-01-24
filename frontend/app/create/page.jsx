"use client";

import { useState } from "react";
import { useWallet } from "../context/WalletContext";

export default function AddBlogPage() {
  const { walletAddress, isConnected } = useWallet();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, walletAddress }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch from server. Please try again.");
      }

      const data = await response.json();

      if (data.success) {
        setMessage("Blog posted successfully!");
        setTitle("");
        setContent("");
      } else {
        setMessage("Failed to post blog. Try again.");
      }
    } catch (error) {
      setMessage(
        "Error: Unable to connect to the server. Please try again later."
      );
    }
  };

  return (
    <div className="h-[90vh] bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="w-full mt-20 max-w-lg">
        <h1 className="text-xl md:text-xl lg:text-2xl font-extrabold text-center mb-8 text-primary">
          Create a New Blog
        </h1>

        {message && (
          <div className="text-center mb-4">
            <p
              className={`font-semibold ${
                message.includes("successfully")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your blog title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
              placeholder="Write your blog content here"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-accent transition duration-200"
          >
            Post Blog
          </button>
        </form>

        {!isConnected && (
          <div className="mt-4 text-center">
            <p className="text-red-400 font-semibold">
              Please connect your wallet first to submit your blog.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
