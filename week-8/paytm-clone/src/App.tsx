import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeLayout from "./Layout/HomeLayout";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Signin from "./pages/signin"
import SignUp from "./pages/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Signin/>} path="/signin"/>
      <Route element={<SignUp/>} path="/signup"/>
        <Route path="/" element={<HomeLayout />}>
          <Route element={<Dashboard/>} index />
          <Route path="/send" element={<SendMoney/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
