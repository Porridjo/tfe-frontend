import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
