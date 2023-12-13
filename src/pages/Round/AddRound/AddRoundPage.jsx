import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

const AddRoundPage = () => {
  const [roundName, setRoundName] = useState("")
  const [nurseries, setNurseries] = useState([])

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

  const addRound = () => {
    const round = {
      nom: roundName,
      crèches: nurseries,
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    axios
      .post("https://tfe-group10-prod.azurewebsites.net/tournees/", round, headers)
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
  }

  return (
    <>
      <button onClick={addRound}>Enregistrer</button>
      <p>Entrer le nom de tournée: </p>
      <input type="text" value={roundName} onChange={handleChange}/>
    </>
  )
}

export default AddRoundPage