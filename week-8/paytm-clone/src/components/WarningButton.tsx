import { Link } from "react-router-dom";

function WarningButton({ label, to }: { label: string; to: string }) {
  return (
    <p className="text-sm text-gray-500 text-center">
      {label}
      <Link to={`/${to}`}>
        <span className="text-blue-500">
          {to === "signin" ? "Sign In" : "Sign Up"}
        </span>
      </Link>
    </p>
  );
}

export default WarningButton;
