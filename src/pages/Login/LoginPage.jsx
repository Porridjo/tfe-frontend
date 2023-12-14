import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../stylesheets/position.css";

const LoginPage = ({ setUser }) => {
  const [messageLogin, setMessageLogin] = useState("");
  const [isLogged, setIsLogged] = useState(undefined);

  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const baseApiUrl = process.env.NODE_ENV === 'production' ? 'https://tfe-group10-dev.azurewebsites.net' : 'http://localhost:5000';
    try {
      // Effectuer l'appel à l'API pour le login
      const response = await axios.post(
        `${baseApiUrl}/users/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Authentification réussie
        setMessageLogin("Authentification réussie!");
        setIsLogged(true);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(credentials.username);
        navigate("/round");
      }
    } catch (error) {
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'état différent de 2xx
        if (error.response.status === 401) {
          setMessageLogin('Identifiant ou mot de passe incorrect.');
          setIsLogged(false);
        } else {
          // Autres erreurs du serveur
          console.error('Erreur du serveur:', error.response.data);
          setMessageLogin('Une erreur est survenue du côté du serveur.');
          setIsLogged(false);
        }
      } else if (error.request) {
        // La requête a été faite, mais aucune réponse n'a été reçue
        console.error('Pas de réponse reçue du serveur:', error.request);
        setMessageLogin('Pas de réponse reçue du serveur.');
        setIsLogged(false);
      } else {
        // Autres erreurs
        console.error('Erreur inattendue:', error.message);
        setMessageLogin('Une erreur inattendue est survenue.');
        setIsLogged(false);
      }
    }
  };

  return (
    <div className="center-container">
      <h1>Page de connexion</h1>
      <LoginForm onLogin={handleLogin} />
      <p
        className={
          isLogged ? "validMessage" : isLogged == false ? "errorMessage" : ""
        }
      >
        {messageLogin}
      </p>
    </div>
  );
};

export default LoginPage;
