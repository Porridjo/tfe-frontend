import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import RoundPage from "../pages/Round/RoundPage";
import DeliverPage from "../pages/Deliver/DeliverPage";
import DeliverDetails from "../pages/Deliver/DeliverDetails"
import { useState } from "react";
import RoundCreationPage from "../pages/Round/RoundCreation/RoundCreationPage";
import OrderCreationPage from "../pages/OrderCreation/OrderCreationPage";
import OrderCreationPage2 from "../pages/OrderCreation/OrderCreationPage2";

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

      <Route path="/round/create-round" element={user ? <RoundCreationPage nurseries={nurseries} /> : <Navigate replace to="/" />} />
      <Route path="/round/create-round/addorder" element={user ? <OrderCreationPage formData={formData} setFormData={setFormData} /> : <Navigate replace to="/" />} />
      <Route path="/round/create-round/addorder2" element={user ? <OrderCreationPage2 formData={formData} nurseries={nurseries} setNurseries={setNurseries} /> : <Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
