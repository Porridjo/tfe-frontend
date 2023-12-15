import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import roundService from '/src/services/rounds.js'
import '/src/stylesheets/RoundCreationPage.css'

const RoundCreationPage = ({ roundName, setRoundName, nurseries, setNurseries, setFormData }) => {
  const navigate = useNavigate()
  const handleChange = (e) => {
    setRoundName(e.target.value)
  }

  const addRound = () => {
    if (roundName == "") {
      alert("Veuillez entrer un nom pour la nouvelle tournée.");
      return;
    }
    
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

    setRoundName(""),
    setFormData({
      nurseryName: "",
      nurseryAdress: "",
      telephoneNumber: "",
    })
    setNurseries([])
    navigate('/round')
  }

  return (
    <div className="round-creation-container">
      <div className="button-div-round">
        <Link to="/round">
          <button>Retour</button>
        </Link>
        <button onClick={addRound}>Enregistrer</button>
      </div>
      <div className="round-form">
        <h2>Créer une tournée</h2>
        <div className="round-input-div">
          <p>Entrer le nom de tournée: </p>
          <input className="roundname-input" type="text" value={roundName} onChange={handleChange}/>
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

export default RoundCreationPage