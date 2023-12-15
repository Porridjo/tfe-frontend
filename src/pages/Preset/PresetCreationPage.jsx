import { useEffect, useState } from "react"
import nurseryService from '/src/services/nurseries.js'
import '/src/stylesheets/PresetPage.css'
import { Link, useNavigate, useParams } from "react-router-dom"
import roundsService from '/src/services/rounds.js'

const PresetCreationPage = ( {preset, setPreset, nurseries, setNurseries}) => {
  
  const navigate = useNavigate();

  const roundName = useParams().roundname

  useEffect(() => {
    nurseryService
      .getAllNurseries()
      .then(response => setNurseries(response))
    
    roundsService
      .getRoundPreset(roundName)
      .then(response => setPreset(response))
  }, [])

  const addToPreset = (nurseryToAdd) => {
    setPreset(prevPreset => [...prevPreset, nurseryToAdd])
    setNurseries(prevNurseries => [...prevNurseries.filter(nursery => nursery !== nurseryToAdd)])
  }

  const removeFromPreset = (nurseryToRemove) => {
    setPreset(prevPreset => [...prevPreset.filter((nursery) => nursery !== nurseryToRemove)])
    setNurseries(prevNurseries => [...prevNurseries, nurseryToRemove])
  }

  const savePreset = () => {

    const presetToSave = {
      crèches: []
    }

    preset.forEach(nursery => {
      const nurseryFormated = {
        nom: nursery.creche.nom
      }
      presetToSave.crèches.push(nurseryFormated)
    })

    roundsService
      .editRoundPreset(roundName, presetToSave)

    navigate(`/round/${roundName}`)
  } 

  const presetNameArray = preset.map(nursery => nursery.creche.nom)

  const filteredNurseries = nurseries.filter(nursery => !presetNameArray.includes(nursery.creche.nom))

  return (
    <div className="preset-page-container">
      <div className="button-div">
        <Link to={`/round/${roundName}`}>
          <button>Retour</button>
        </Link>
        <button onClick={savePreset}>Enregistrer le preset</button>
      </div>
      <div className="preset-modification-div">
        <div className="nursery-list">
          <table>
            <thead>
              <tr>
                <th><h2>Crèche</h2></th>
              </tr>
            </thead>
            <tbody>
            {filteredNurseries.map((nursery, index) => {
            return (
              
              <tr key={index}>
                <td>
                  <Link to={`/round/${roundName}/preset/${nursery.creche.nom}`}>
                    <div>{nursery.creche.nom}</div>
                  </Link>
                  <div>{nursery.creche.adresse}</div>
                </td>
                <td>
                  <button onClick={() => addToPreset(nursery)}>Ajouter</button>
                </td> 
              </tr>
              
            )})}
            </tbody>         
          </table>
        </div>
        <div className="preset-div">
          <table>
              <thead>
                <tr>
                  <th><h2>Preset</h2></th>
                </tr>
              </thead>
              <tbody>
              {preset.map((nursery, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/round/${roundName}/preset/${nursery.creche.nom}`}>
                      <div>{nursery.creche.nom}</div>
                    </Link>
                    <div>{nursery.creche.adresse}</div>
                  </td>
                  <td>
                    <button onClick={() => removeFromPreset(nursery)}>Enlever</button>
                  </td> 
                </tr>
              )})}
              </tbody>         
            </table>
        </div>
      </div> 
    </div>
  )
}

export default PresetCreationPage