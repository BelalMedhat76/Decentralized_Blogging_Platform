"use client";

import { useWallet } from "../context/WalletContext";
import { useEffect, useState } from "react";

export default function AllBlogsPage() {
  const { walletAddress, isConnected } = useWallet();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/blogs");

      if (!response.ok) {
        throw new Error("Failed to fetch blogs. Please try again later.");
      }

      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        setError("Failed to fetch blogs.");
      }
    } catch (error) {
      setError("An error occurred while fetching blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className=" min-h-[90vh] pt-[120px] bg-gray-900 text-white p-6">
      <h1 className="text-xl md:text-xl lg:text-4xl  font-extrabold  text-center mb-8 text-primary">
        All Blogs
      </h1>

      {isConnected ? (
        <>
          <div className="text-center flex justify-center mb-10 mt-4 animate__animated animate__fadeIn">
            <div className="p-4 flex flex-col sm:flex-row items-center justify-center border-2 border-primary rounded-md bg-gray-800 text-green-400 w-full max-w-lg">
              <p className="text-xs sm:text-sm font-semibold text-primary truncate w-full sm:w-auto text-center sm:text-left">
                Wallet Address:
              </p>
              <span className="text-xs sm:text-sm break-all sm:ml-2 text-center sm:text-left">
                {walletAddress}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center flex justify-center mb-10 mt-4 animate__animated animate__fadeIn">
          <div className="p-4 flex flex-col sm:flex-row items-center justify-center border-2 border-primary rounded-md bg-gray-800 text-green-400 w-full max-w-lg">
            <p className="text-xs sm:text-sm font-semibold text-primary truncate w-full sm:w-auto text-center sm:text-left">
              Please Connect To Wallet To Post a Blog
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-400">Loading blogs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-primary truncate">
                  {blog.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base mb-3 line-clamp-3">
                  {blog.content}
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-4 break-words">
                <span className="font-semibold">Author :</span>{" "}
                {blog.walletAddress}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

