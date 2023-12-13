import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../stylesheets/RoundPage.css'
import roundService from '../../services/rounds'

const RoundPage = () => {
   
    const [rounds, setRounds] = useState([])

    useEffect(() => {
        roundService
            .getAllRounds()
            .then(rounds => {
                setRounds(rounds)
            })
    }, [])
    
    console.log(rounds)

    const handleDeleteButton = (roundName) => {
        roundService
            .deleteOneRound()
            .then(() => {
                const updatedRounds = rounds.filter(round => round.tournee.nom !== roundName)
                setRounds(updatedRounds)
            })
    }

    return (
        <div className="center-container" style={{color: 'black'}}>
            <div className='between'>
                <button className='margin-button'> Gérer articles </button>
                <Link to={"/round/create-round"}>
                  <button className='margin-button'> Ajouter tournée </button>
                </Link>
                
            </div>
            <h2>Tournées</h2>
            <div className='round-scroller'>
                {rounds.length > 0 ? (
                    <>
                        {rounds.map((object, index) => {
                            return (
                                <div key={index} className='scroller-item'>
                                    <Link to={`/round/${object.tournee.nom}`} className={'link-style'}>
                                        <p>{object.tournee.nom}</p>
                                    </Link>
                                    <button onClick={() => handleDeleteButton(object.tournee.nom)}>Supprimer</button>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <div>Loading ...</div>
                )}
            </div>
        </div>   
    )
}

export default RoundPage