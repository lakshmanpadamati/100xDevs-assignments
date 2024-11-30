
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="  h-fit flex items-center flex-col justify-center">
      <div className="m-4">Page NotFound</div>
      <div>
        <Link to="/" className="bg-blue-500 text-white rounded-md p-3 ">
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
