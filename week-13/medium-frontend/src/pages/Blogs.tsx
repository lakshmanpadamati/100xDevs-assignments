import React from "react";
import { useAuth } from "../context/Auth";
import BlogCard from "../components/BlogCard";
import { useNotification } from "../context/Notification";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

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

export const BlogsLoader = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token is not available");
  }
  try {
    const response = await axios.get("http://localhost:4000/api/v1/blogs", {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    });
    return { blogs: response.data };
  } catch (error:any) {
    throw new Error("Failed to fetch blogs: " + error.message);
  }
};

function Blogs() {
  const { isAuthenticated } = useAuth();
  const { blogs } = useLoaderData() as { blogs: BlogType[] };
  const { notify } = useNotification();
  
  if (!isAuthenticated) {
    return <p>You need to be authenticated to view blogs.</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <p>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</p>
      {blogs.length > 0 ? (
        blogs.map((blog: BlogType) => (
          <BlogCard key={blog.id} blog={blog} />
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
}

export default Blogs;
