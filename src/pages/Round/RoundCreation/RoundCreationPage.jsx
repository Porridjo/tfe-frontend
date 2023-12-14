import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import roundService from '/src/services/rounds.js'
import '/src/stylesheets/RoundCreationPage.css'

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
    <div className="round-creation-container">
      <div className="button-div">
        <button onClick={addRound}>Enregistrer</button>
      </div>
      <div className="round-form">
        <h2>Créer une tournée</h2>
        <div className="round-input-div">
          <p>Entrer le nom de tournée: </p>
          <input type="text" value={roundName} onChange={handleChange}/>
        </div>
        <Link to={"/round/create-round/addorder"}>
          <button className="add-order-btn">Ajouter une commande</button>
        </Link>
        <ul>
          {nurseries.map((nursery, index) => <li key={index}>{nursery.nom}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default AddRoundPage