import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import roundService from '/src/services/rounds.js'

const AddRoundPage = ({ nurseries, setFormData }) => {
  const [roundName, setRoundName] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setRoundName(e.target.value)
  }

  const addRound = () => {
    const round = {
      nom: roundName,
      crèches: nurseries,
    }
  
    roundService
      .createOneRound(round)
    
    setFormData({
      nurseryName: "",
      nurseryAdress: "",
      telephoneNumber: "",
    })
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