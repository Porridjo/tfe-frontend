import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import RoundPage from "../pages/Round/RoundPage";
import DeliverPage from "../pages/Deliver/DeliverPage";
import DeliverDetails from "../pages/Deliver/DeliverDetails"
import { useState } from "react";
import RoundCreationPage from "../pages/Round/RoundCreation/RoundCreationPage";
import OrderCreationPage from "../pages/OrderCreation/OrderCreationPage";
import OrderCreationPage2 from "../pages/OrderCreation/OrderCreationPage2";
import ArticleCreationPage from "../pages/Article/ArticleCreationPage";
import UserCreationPage from "../pages/User/UserCreationPage";
import ModifyCommand from "../pages/ModifyCommand/ModifyCommand";

const App = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.user || null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nurseryName: "",
    nurseryAdress: "",
    telephoneNumber: "",
  })
  
  const [nurseries, setNurseries] = useState([])

  const signOut = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate("/")
  }

  return (
    <>
    {user && <button onClick={signOut}>Déconnexion</button>}
    <Routes>
      <Route path="/" element={user ? <Navigate replace to="/round"/> : <LoginPage setUser={setUser}/>} />
      <Route path='/round' element={user ? <RoundPage /> : <Navigate replace to="/" />} />
      <Route path='/round/:roundname' element={user ? <DeliverPage /> : <Navigate replace to="/" />} />
      <Route path='/round/:roundname/:nurseryname' element={user ? <DeliverDetails /> : <Navigate replace to="/" />} />

      <Route path='/modify/:roundname/:nurseryname' element={user ? <ModifyCommand/> : <Navigate replace to="/" />} />

      <Route path="/round/create-round" element={user ? <RoundCreationPage nurseries={nurseries} setFormData={setFormData} /> : <Navigate replace to="/" />} />
      <Route path="/round/create-round/addorder" element={user ? <OrderCreationPage formData={formData} setFormData={setFormData} /> : <Navigate replace to="/" />} />
      <Route path="/round/create-round/addorder2" element={user ? <OrderCreationPage2 formData={formData} setNurseries={setNurseries} /> : <Navigate replace to="/" />} />
      <Route path='/create-article' element={user ? <ArticleCreationPage /> : <Navigate replace to="/" />} />
      <Route path='/create-user' element={user ? <UserCreationPage /> : <Navigate replace to="/" />} />
    </Routes>
    </>
  );
};

export default App;
