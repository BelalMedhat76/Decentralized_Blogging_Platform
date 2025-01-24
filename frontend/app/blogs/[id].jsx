import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (router.isReady && id) { 
      fetchBlog(id);
    }
  }, [router.isReady, id]);

  const fetchBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/blogs/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog. Please try again later.");
      }
      const data = await response.json();
      if (data.success) {
        setBlog(data.blog);
      } else {
        throw new Error("Blog not found.");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[120px] bg-gray-900 text-white p-6">
      {loading ? (
        <p className="text-center text-gray-400">Loading blog...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : (
        blog && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-4">{blog.title}</h1>
            <p className="text-xs text-gray-400 mb-6">
              Author: {blog.walletAddress}
            </p>
            <div className="text-gray-300 text-lg">{blog.content}</div>
          </div>
        )
      )}
    </div>
  );
}
