import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const AddRoundPage = ({ nurseries }) => {
  const [roundName, setRoundName] = useState("")
  const navigate = useNavigate()

  /*
  useEffect(() => {
    axios
      .get('https://tfe-group10-prod.azurewebsites.net/tournees/')
      .then(response => setRounds(response.data))
  }, [])
  */

  const handleChange = (e) => {
    setRoundName(e.target.value)
  }

  const token = JSON.parse(localStorage.getItem('user')).access_token;

  const addRound = () => {
    const round = {
      nom: roundName,
      crèches: nurseries,
    }
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        
      }
    }
    axios
      .post("http://localhost:5000/tournees/", round, headers)
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
    
    navigate('/round')
  }

  return (
    <>
      <button onClick={addRound}>Enregistrer</button>
      <p>Entrer le nom de tournée: </p>
      <input type="text" value={roundName} onChange={handleChange}/>
      <Link to={"/round/create-round/addorder"}>
        <button>Ajouter une commande</button>
      </Link>
      <ul>
        {nurseries.map((nursery, index) => <li key={index}>{nursery.nom}</li>)}
      </ul>
      
    </>
  )
}

export default AddRoundPage