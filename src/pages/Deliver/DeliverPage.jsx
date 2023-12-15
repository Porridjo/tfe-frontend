import { useEffect, useState } from "react"
import { Link, useNavigate, useParams} from 'react-router-dom'
import '../../stylesheets/DeliverPage.css'
import roundService from "../../services/rounds"
import nurseryService from "../../services/nurseries"

const DeliverPage = () => {

    const [nurseries, setNurseries] = useState([])
    const navigate = useNavigate()
    const roundName = useParams().roundname
    const user = JSON.parse(localStorage.getItem('user'))?.user || null
    let componentToRender

    const [preset, setPreset] = useState([])

    console.log("pres",preset)
    
    useEffect(() => {
        roundService
            .getOneRound(roundName)
            .then(round => {
                setNurseries(round)
            })

        roundService
        .getOneRoundDefault(roundName)
        .then(response => setPreset(response))
    }, [])
    
    const allArticles = []
    let index = 1

    nurseries.forEach(nursery => {

        nursery.articleList.forEach(object => {

            let foundArticle = allArticles.find(existingArticle => existingArticle.name === object.article.nom)
            if (!foundArticle){
                allArticles.push({name: object.article.nom, quantity: object.quantite, unit: object?.unite, id: index})
                index++
            } else {
                let articleWithUpdatedQuantity = {
                    ...foundArticle,
                    quantity: foundArticle.quantity + object.quantite
                }
                let indiceArticle = allArticles.findIndex(article => {
                    return article.id == articleWithUpdatedQuantity.id
                })
                if (indiceArticle !== -1) allArticles[indiceArticle] = articleWithUpdatedQuantity
            }
        })
    })

    const handleChangeStatut = (nurseryName, nurseryStatut) => {
        
        const newStatut = {
            'statut': nurseryStatut === 'Livré' ? 'Pas livré' : 'Livré'
        }
        
        nurseryService
            .updateNurseryStatut(nurseryName, newStatut)
            .then(() => {
                const updatedNursery = nurseries.find(nursery => nursery.creche.nom === nurseryName)
                updatedNursery.creche.statut = newStatut.statut
                setNurseries(nurseries.map(nursery => nursery.creche.nom !== nurseryName ? nursery : updatedNursery))
            })
    }

    const resetNurseries = () => {
      roundService
        .replaceWithPreset(roundName, preset)
        .then(response => console.log("good"))
    }

    return (
        <div className="deliver-container" style={{color: 'black'}}>
            <div className="nurseries-element">
                
                <button className="button-deliver" onClick={() => navigate('/round')}> Retour </button>
                <Link to={`/round/${roundName}/preset`}>
                  <button>Modifier le preset</button>
                </Link>
                <button onClick={resetNurseries}>Réinitialiser au preset</button>
                <h3>Crèches de la tournée</h3>
                <div className='nurseries-scroller'>
                    {nurseries.length > 0 ? (
                        <>
                            {nurseries.map((nursery, index) => {
                                if (user){
                                    if (user.isAdmin){
                                        componentToRender = (
                                            <Link className='link-style' to={`/modify/${roundName}/${nursery.creche.nom}`}>                            
                                                <p>{nursery.creche.nom}</p>
                                            </Link>
                                        )
                                    } else {
                                        componentToRender = (
                                            <Link className='link-style' to={`/round/${roundName}/${nursery.creche.nom}`}>                            
                                                <p>{nursery.creche.nom}</p>
                                            </Link>
                                        )
                                    }
                                }
                                return (
                                    <div className='scroller-item-deliver' key={index}>
                                        {componentToRender}
                                        <button onClick={() => {handleChangeStatut(nursery.creche.nom, nursery.creche.statut)}} className={nursery.creche.statut === 'Livré' ? 'statut-button-delivered' : 'statut-button-not-delivered'}> 
                                            {nursery.creche.statut === undefined ? 'Pas de statut' : nursery.creche.statut} 
                                        </button>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        <div style={{textAlign: 'center'}}>C'est vide...</div>
                    )}
                    
                </div>
                <h3>Quantités d'articles</h3>
                <div className="info">
                    {allArticles.length > 0 ? (
                        <>
                            {allArticles.map(article => {
                                return (
                                    <p className='article' key={article.id}>{article.name}: {article.quantity} {article.unit !== undefined && article.unit}</p>
                                )
                            })}
                        </>
                    ) : (
                        <div style={{textAlign: 'center'}}>C'est vide...</div>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default DeliverPage