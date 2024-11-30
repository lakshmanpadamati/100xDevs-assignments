"use client";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function NewStory() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState<string>(""); // Tags as a comma-separated string
  const [editorContent, setEditorContent] = useState<string>("");
  const editorRef = useRef<HTMLDivElement | null>(null);

  const options = {
    placeholder: "Write your story here...",
    theme: "snow",
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // Text formatting
        [{ header: [1, 2, 3, false] }], // Header options
        [{ size: ["small", false, "large", "huge"] }], // Text size options
        [{ align: [] }], // Text alignment
        [{ list: "ordered" }, { list: "bullet" }], // Lists
        ["link"], // Link
        ["clean"], // Clear formatting
      ],
    },
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("Editor Content:", editorContent); // Log editor content
    try {
      const response = await fetch("http://localhost:4000/api/v1/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          subtitle,
          tags: tags.split(",").map((tag) => tag.trim()), // Convert tags to array
          content: editorContent,
        }),
      });

      if (response.ok) {
        alert("Story created successfully");
        setTitle("");
        setSubtitle("");
        setTags("");
        setEditorContent("");
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, options);

      quill.on("text-change", () => {
        setEditorContent(quill.root.innerHTML);
      });
    }
  }, []);

  return isSubmitting ? (
    <div>Submitting...</div>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-4"
    >
      <label htmlFor="title" className="text-4xl font-semibold">
        Title
      </label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the title"
        className="outline-none focus:outline-none w-full px-4 py-2 border border-gray-300 rounded-lg my-2"
      />

      <label htmlFor="subtitle" className="text-2xl font-medium">
        Subtitle
      </label>
      <input
        id="subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Enter the subtitle"
        className="outline-none focus:outline-none w-full px-4 py-2 border border-gray-300 rounded-lg my-2"
      />

      <label htmlFor="tags" className="text-xl font-medium">
        Tags
      </label>
      <input
        id="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Enter tags (comma-separated)"
        className="outline-none focus:outline-none w-full px-4 py-2 border border-gray-300 rounded-lg my-2"
      />

      <div
        ref={editorRef}
        className="min-h-full border border-gray-300 rounded-lg p-2"
      ></div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
