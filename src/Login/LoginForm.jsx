import { useState } from "react";
import "../stylesheets/LoginPage.css";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          className="searchInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Identifiant"
        />
      </div>
      <div>
        <input
          className="searchInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
      </div>
      <div>
        <button className="button" type="submit">
          Se connecter
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
