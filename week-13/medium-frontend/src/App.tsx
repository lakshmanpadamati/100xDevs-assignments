import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Auth";
import NotificationProvider from "./context/Notification";
import AuthContextProvider from "./context/Auth";
import Dashboard from "./pages/Dashboard";
import NewStory from "./pages/New-story";
import Blogs from "./pages/Blogs";
import Protected from "./pages/Protected";
import Blog from "./pages/Blog";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/auth" element={<Signin />} />     
            <Route element={<Protected />}>
              
              <Route path="/" element={<Dashboard />}>
                <Route index element={<Blogs />} /> 
                <Route path="blogs/:blogId" element={<Blog />} />
                <Route path="new-story" element={<NewStory />} />
              </Route>
          
            </Route>
          </Routes>
        </NotificationProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
