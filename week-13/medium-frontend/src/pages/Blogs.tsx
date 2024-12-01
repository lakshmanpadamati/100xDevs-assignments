import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import BlogCard from "../components/BlogCard";
import { useNotification } from "../context/Notification";

type BlogType = {
  id: number;
  author: string;
  title: string;
  subtitle: string;
  tags: [{ tag: string }];
  likes_count: number;
  saved_count: number;
  createdAt: string;
  authorId: number;
};

function Blogs() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  const { notify } = useNotification();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
       console.log("blogs fetched")
        const response = await fetch("http://localhost:4000/api/v1/blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error: any) {
        notify(error.message, "error");
      } 
    
    };
    fetchBlogs();
  }, []);

const {isAuthenticated}=useAuth()
  return (
    <div className="flex flex-col items-center">
        <p>{isAuthenticated?"authenticated":"not auth"}</p>
      {blogs.map((blog: BlogType) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default Blogs;
