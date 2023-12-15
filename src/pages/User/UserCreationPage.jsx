import { useState } from "react";
import Input from "/src/components/Input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../stylesheets/UserCreationPage.css'
import "../../stylesheets/position.css";

const UserCreationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user"))?.access_token;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const createUser = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Le mot de passe ne correspond pas à la confirmation.");
      return;
    }

    const newUser = {
      username: formData.username,
      password: formData.password,
    };

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const baseApiUrl = process.env.NODE_ENV === 'production' ? 'https://tfe-group10-dev.azurewebsites.net' : 'http://localhost:5000';

    axios.post(`${baseApiUrl}/users/register`, newUser, headers);
  };

  return (
    <>
      <div className='user-creation-container'>
        <div className="button-div-create-user">
          <button onClick={() => navigate(`/round`)}>Retour</button>
        </div>
        <div className="user-creation-form-div">
          <h2>Créer un utilisateur</h2>
          <form  onSubmit={createUser}>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              label="Login"
              type="text"
            />
            <Input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              label="Mot de passe"
              type="password"
            />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              label="Confirmer le mot de passe"
              type="password"
            />
            <div>
              <input type="submit" value="Créer l'utilisateur" />
            </div>
          </form>
        </div>
        
      </div>
    </>
  );
};

export default UserCreationPage;
