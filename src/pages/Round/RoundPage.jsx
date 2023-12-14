import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../stylesheets/RoundPage.css'
import '../../stylesheets/Buttons.css'
import roundService from '../../services/rounds'

const RoundPage = () => {
   
    const [rounds, setRounds] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))?.user || null

    useEffect(() => {
        roundService
            .getAllRounds()
            .then(rounds => {
                setRounds(rounds)
            })
    }, [])
    

    const handleDeleteButton = (roundName) => {
        roundService
            .deleteOneRound(roundName)
            .then(() => {
                const updatedRounds = rounds.filter(round => round.tournee.nom !== roundName)
                setRounds(updatedRounds)
            })
    }

    return (
        <div className="center-container" style={{color: 'black'}}>
            {user && user.isAdmin && 
                <div className='between'>
                    <Link to="/create-user">
                        <button className='button-round'> Créer des utilisateurs </button>
                    </Link>
                    <Link to="/create-article">
                        <button className='button-round'> Gérer articles </button>
                    </Link>
                    <Link to={"/round/create-round"}>
                        <button className='button-round'> Ajouter tournée </button>
                    </Link>
                </div>
            }
            <div className='round-element'>
                <h2>Tournées</h2>
                <div className='round-scroller'>
                    {rounds.length > 0 ? (
                        <>
                            {rounds.map((object, index) => {
                                return (
                                    <div key={index} className='scroller-item-round'>
                                        <Link to={`/round/${object.tournee.nom}`} className={'link-style'}>
                                            <p>{object.tournee.nom}</p>
                                        </Link>
                                        <button className="button-delete" onClick={() => handleDeleteButton(object.tournee.nom)}>Supprimer</button>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        <div>Loading ...</div>
                    )}
                </div>
            </div>
        </div>   
    )
}

export default RoundPage