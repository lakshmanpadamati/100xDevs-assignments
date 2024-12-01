import { useAuth } from "../context/Auth";
import { Link, Outlet, useLocation } from "react-router-dom";
function Avatar({ s }: { s: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md">
        <span className="text-2xl font-semibold">{s}</span>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user} = useAuth();
  const location = useLocation();
  const initial = user?.fullname ? user.fullname[0].toUpperCase() : "?";
  return (
    <>
      <div className="flex items-center justify-between p-5">
        <div>
 
          <img
            alt="Your Company"
            src="https://logos-world.net/wp-content/uploads/2023/07/Medium-Logo.png"
            className="mx-auto h-10 w-auto"
          />
        </div>
    
        <div className="flex  items-center justify-center gap-4">
          {location.pathname === "/new-story" ? null : (
            <Link
              to="/new-story"
              className="text-white bg-black rounded-md p-1"
            >
              New Story
            </Link>
          )}
          <Avatar s={initial} />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Dashboard;
