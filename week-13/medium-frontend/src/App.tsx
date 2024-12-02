import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signin from "./pages/Auth";
import NotificationProvider from "./context/Notification";
import AuthContextProvider from "./context/Auth";
import Dashboard from "./pages/Dashboard";
import NewStory from "./pages/New-story";
import Blogs, { BlogsLoader } from "./pages/Blogs";
import Protected from "./pages/Protected";
import Blog from "./pages/Blog";

// Define your routes using createRoutesFromElements for better nesting
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<NotificationProvider />}>
      <Route element={<AuthContextProvider />}>
        <Route path="/auth" element={<Signin />} />

        {/* Protected routes */}
        <Route element={<Protected />}>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Blogs />} loader={BlogsLoader} />
            <Route path="blogs/:blogId" element={<Blog />} />
            <Route path="new-story" element={<NewStory />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
