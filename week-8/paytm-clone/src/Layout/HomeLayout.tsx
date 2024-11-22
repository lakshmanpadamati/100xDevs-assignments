import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <main className="min-h-screen  ">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default HomeLayout;
