import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeLayout from "./Layout/HomeLayout";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route element={<Dashboard/>} index />
          <Route path="/send:mobile" element={<SendMoney/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
