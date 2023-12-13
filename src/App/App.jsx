import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import RoundPage from "../pages/Round/RoundPage";
import DeliverPage from "../pages/Deliver/DeliverPage";
import DeliverDetails from "../pages/Deliver/DeliverDetails"
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

  const [nurseries, setNurseries] = useState([])

  return (
    <Routes>
      <Route path="/" element={<LoginPage setUser={setUser} />} />
      <Route path='/round' element={user ? <RoundPage /> : <Navigate replace to="/" />} />
      <Route path='/round/:roundname' element={user ? <DeliverPage /> : <Navigate replace to="/" />} />
      <Route path='/round/:roundname/:nurseryname' element={user ? <DeliverDetails /> : <Navigate replace to="/" />} />

      <Route path="/round/addround" element={user ? <AddRoundPage nurseries={nurseries} /> : <Navigate replace to="/" />} />
      <Route path="/round/addround/addorder" element={user ? <AddOrderPage formData={formData} setFormData={setFormData} /> : <Navigate replace to="/" />} />
      <Route path="/round/addround/addorder2" element={user ? <AddOrderPage2 formData={formData} nurseries={nurseries} setNurseries={setNurseries} /> : <Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
