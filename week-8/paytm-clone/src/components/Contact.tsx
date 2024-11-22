
import { Link } from "react-router-dom";
function Contact({
  name,
  mobile,
  image,
}: {
  name: string;
  mobile: number | string;
  image?: string;
}) {
  return (
    <li className="flex px-4 py-2 items-center rounded-md border-gray-400 border-[2px] m-2 justify-between">
      <div className="">
        {image && (
          <img
            className="h-10 w-10 rounded-full"
            src={
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        )}
      </div>
      <div>{name}</div>
      <div>{mobile}</div>
      <Link
        className="bg-gray-700 text-white p-2 rounded-md"
        to={`/send/?mobile=${mobile}`
         
        }
      >
        send Money{" "}
      </Link>
    </li>
  );
}

export default Contact;
