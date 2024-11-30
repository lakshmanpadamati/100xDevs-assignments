import { Link } from "react-router-dom";
function Contact({
  firstname,
  lastname,
  _id,
  email,
}: {
  firstname: string;
  lastname: string;
  _id: string;
  email: string;
}) {
  console.log(lastname);
  return (
    <li className="flex px-4 py-2 items-center rounded-md border-gray-400 border-[2px] my-2 justify-between">
    <div className="flex items-center space-x-4"> {/* Added space between elements */}
      <span className="font-bold text-white w-10 h-10 bg-slate-500 flex items-center justify-center rounded-full">
        {email[0].toUpperCase()}
      </span>
      <p className="m-0">{`${firstname} ${lastname}`}</p> {/* Ensured no extra margin/padding */}
    </div>
    
    <Link
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition ease-in-out duration-300"
      to={`/send/?userId=${_id}&name=${firstname}`}
    >
      send Money
    </Link>
  </li>
  
  );
}

export default Contact;
