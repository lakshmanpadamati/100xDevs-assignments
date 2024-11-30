"use client"
import { useEffect, useState } from "react";

function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:4000/api/v1/blogs",{headers:{authorization:`Bearer ${localStorage.getItem("token")}`}}); 
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to fetch blogs");
        }
        const data = await response.json();
        console.log(data)
        setBlogs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}

export default useBlogs;
