"use client";
import React from "react";
import useBlogs from "@/hooks/useBlogs";
import Blog from "@/components/Blog";
function BlogList() {
  const { blogs, loading, error } = useBlogs();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog: any) => (
          <Blog {...blog} key={blog.id} />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
