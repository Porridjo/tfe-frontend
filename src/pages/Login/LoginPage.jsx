import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { useNavigate } from "react-router-dom";
import '../stylesheets/position.css'

const LoginPage = () => {
  const [messageLogin, setMessageLogin] = useState('');
  const [isLogged, setIsLogged] = useState(undefined);

  const navigate = useNavigate();


  const handleLogin = async (credentials) => {
    try {
      // Effectuer l'appel à l'API pour le login
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        // Authentification réussie
        setMessageLogin('Authentification réussie!');
        setIsLogged(true);
        navigate('/home');
      } else {
        // Gérer les erreurs d'authentification
        setMessageLogin('Veuillez entrer un identifiant et un mot de passe valide.');
        setIsLogged(false);
      }
    } catch (error) {
      // Gérer les erreurs liées à l'appel API
      console.error('API call failed:', error);
      setMessageLogin('Une erreur est survenue..');
    }
  };

  return (
    <div className="center-container">
      <h1>Page de connexion</h1>
      <LoginForm onLogin={handleLogin} />
      <p className= {isLogged ? 'validMessage' : isLogged == false ? 'errorMessage' : ''}>{messageLogin}</p>
    </div>
  );
}

export default LoginPage;
