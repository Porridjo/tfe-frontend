import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import RoundPage from "../pages/Round/RoundPage";
import DeliverPage from "../pages/Deliver/DeliverPage";
import DeliverDetails from "../pages/Deliver/DeliverDetails"
import Home from "../pages/Home/Home";
import { useState } from "react";

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<LoginPage setUser={setUser} />} />
      <Route path="/home" element={user ? <Home /> : <Navigate replace to="/" />} />
      <Route path='/round' element={<RoundPage />} />
      <Route path='/round/:roundname' element={<DeliverPage />} />
      <Route path='/round/:roundname/:nurseryname' element={<DeliverDetails />} />
    </Routes>
  );
};

export default App;
