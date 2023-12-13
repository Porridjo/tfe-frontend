import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import RoundPage from "../pages/Round/RoundPage";
import DeliverPage from "../pages/Deliver/DeliverPage";
import DeliverDetails from "../pages/Deliver/DeliverDetails"
import Home from "../pages/Home/Home";
import { useState } from "react";
import AddRoundPage from "../pages/Round/AddRound/AddRoundPage";
import AddOrderPage from "../pages/AddOrder/AddOrderPage";
import AddOrderPage2 from "../pages/AddOrder/AddOrderPage2";

const App = () => {

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    nurseryName: "",
    nurseryAdress: "",
    telephoneNumber: "",
  })

  return (
    <Routes>
      <Route path="/" element={<LoginPage setUser={setUser} />} />
      <Route path="/home" element={user ? <Home /> : <Navigate replace to="/" />} />
      <Route path='/round' element={<RoundPage />} />
      <Route path='/round/:roundname' element={<DeliverPage />} />
      <Route path='/round/:roundname/:nurseryname' element={<DeliverDetails />} />

      <Route path="/round/addround" element={<AddRoundPage />} />
      <Route path="/round/addround/addorder" element={<AddOrderPage formData={formData} setFormData={setFormData} />} />
      <Route path="/round/addround/addorder2" element={<AddOrderPage2 formData={formData} />} />
    </Routes>
  );
};

export default App;
