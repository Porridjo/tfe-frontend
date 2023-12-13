import { useState } from 'react';
import Input from '/src/components/Input/Input';
import axios from 'axios';

const UserCreationPage = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  })

  const token = JSON.parse(localStorage.getItem('user'))?.access_token;

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  const createUser = () => {
    if (formData.password !== confirmPassword) {
      alert("mot de passe ne correspond pas à la confirmation")
      return;
    }

    const newUser = {
      username: formData.username,
      password: formData.password,
      isAdmin: formData.isAdmin,
    }

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }

    axios
      .post("http://localhost:5000/users/register", newUser, headers)
  }
  
  return (
    <>
      <form onSubmit={createUser}>
        <Input id="username" name="username" value={formData.username} onChange={handleOnChange} label="Login" />
        <Input id="password" name="password" value={formData.password} onChange={handleOnChange} label="Mot de passe" />
        <Input id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleOnChange} label="Confirmer le mot de passe" />
        <label htmlFor="isAdmin">Admin ?</label>
        <input 
            type="checkbox" 
            id="isAdmin" 
            checked={formData.isAdmin}
            onChange={handleOnChange}
            name="isAdmin"
        />
        <br />
        <input type="submit" value="Créer l'utilisateur" />
      </form>
    </>
  )
}

export default UserCreationPage