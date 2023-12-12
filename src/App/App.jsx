import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home";
import { useState } from "react";

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<LoginPage setUser={setUser} />} />
      <Route path="/home" element={user ? <Home /> : <Navigate replace to="/" />} />
    </Routes>
  );
};

export default App;
