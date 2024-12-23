import { Link } from "react-router-dom";

type BlogType = {
  id: number;
  author: string;
  title: string;
  subtitle: string;
  likes_count: number;
  saved_count: number;
  createdAt: string;
  authorId: number;
  tags:[{tag:string}]
};

function BlogCard({ blog }: { blog: BlogType }) {
    
  return (
    <div className="border shadow-lg  p-4 bg-white w-full md:w-2/4 mb-2">
      <h2 className="text-xl font-bold text-gray-900">{blog.title}</h2>
      <h3 className="text-md font-semibold text-gray-700 mt-1">{blog.subtitle}</h3>
      <p className="text-sm text-gray-500 mt-2">
        By <span className="font-medium">{blog.author}</span> | Published on{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <span className="text-sm text-gray-700">👍 {blog.likes_count}</span>
          <span className="text-sm text-gray-700">💾 {blog.saved_count}</span>
        </div>
        <Link
          to={`/blogs/${blog.id}`}
          className="text-indigo-600 hover:underline text-sm font-semibold"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
