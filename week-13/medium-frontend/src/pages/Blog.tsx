import { useParams } from 'react-router-dom';

function Blog() {
  const { blogId } = useParams(); // Make sure the name matches the route parameter

  console.log("Blog ID:", blogId);

  return (
    <div>Hello, blog ID is {blogId}</div>
  );
}

export default Blog;
