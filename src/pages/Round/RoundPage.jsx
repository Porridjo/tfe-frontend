import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../stylesheets/RoundPage.css'
import axios from 'axios'

const RoundPage = () => {

    /*
    const defaultRounds = [
        {tournee: {id: 1, nom: 'Tournée Bruxelles Sud'}},
        {tournee: {id: 2, nom: 'Tournee b'}},
        {tournee: {id: 3, nom: 'Tournee c'}},
        {tournee: {id: 4, nom: 'Tournee d'}},
        {tournee: {id: 5, nom: 'Tournee e'}},
        {tournee: {id: 6, nom: 'Tournee f'}},
        {tournee: {id: 7, nom: 'Tournee g'}},
        {tournee: {id: 8, nom: 'Tournee g'}},
        {tournee: {id: 9, nom: 'Tournee g'}},
        {tournee: {id: 10, nom: 'Tournee g'}},
        {tournee: {id: 11, nom: 'Tournee g'}},
        {tournee: {id: 12, nom: 'Tournee g'}},
        {tournee: {id: 13, nom: 'Tournee g'}},
        {tournee: {id: 14, nom: 'Tournee g'}},
        {tournee: {id: 15, nom: 'Tournee g'}},
        {tournee: {id: 16, nom: 'Tournee g'}},
        {tournee: {id: 17, nom: 'Tournee g'}},
    ]
    */
   
    const [rounds, setRounds] = useState([])

    
    useEffect(() => {
        axios
            .get('http://localhost:5000/tournees')
            .then(response => {
                console.log('promise fulfilled')
                setRounds(response.data)
            })
            .catch(error => {
                console.log('fail :', error)
            })
    }, [])
    
    console.log(rounds)

    const handleDeleteButton = (roundName) => {
        
        axios
            .delete(`http://localhost:5000/tournees/${roundName}`)
            .then(() => {
                console.log('promise fulfilled')
                const updatedRounds = rounds.filter(round => round.tournee.nom !== roundName)
                setRounds(updatedRounds)
            })
            .catch(error => {
                console.log('fail :', error)
            })
    }

    return (
        <div className="center-container" style={{color: 'black'}}>
            <div className='between'>
                <button className='margin-button'> Gérer articles </button>
                <button className='margin-button'> Ajouter tournée </button>
            </div>
            <h2>Tournées</h2>
            <div className='round-scroller'>
                {rounds.length > 0 ? (
                    <>
                        {rounds.map(object => {
                            return (
                                <div key={object.tournee.id} className='scroller-item'>
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