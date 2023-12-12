import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams} from 'react-router-dom'
import '../../stylesheets/DeliverPage.css'


const DeliverPage = () => {

    const [nurseries, setNurseries] = useState([])
    const navigate = useNavigate()
    const roundName = useParams().roundname

    /*
    const defaultNurseries = [
        {articleList: [
            {article: {nom: 'Langes S'}, quantite: 5},
            {article: {nom: 'Inserts'}, quantite: 3}
            ],
        creche:{
            adresse: "Rue Francisco Ferrer 19 boite 3, 6181 Gouy-Lez-Piéton",
            nom: "Rêverie",
            statut: "pas livré"
            }
        },
        {
            articleList: [
                {
                    article: {
                        nom: "Langes S"
                    },
                    quantite: 5
                },
                {
                    article: {
                        nom: "Inserts"
                    },
                    quantite: 3
                },
                {
                    article:{
                        nom: "samere"
                    },
                    quantite: 11
                }
            ],
            creche: {
                adresse: "Rue Francisco Ferrer 19 boite 3, 6181 Gouy-Lez-Piéton",
                nom: "Rêverie",
                statut: "pas livré"
            }
        }
    ]
    */
    
    useEffect(() => {
        axios
            .get(`http://localhost:5000/tournees/${roundName}`)
            .then(response => {
                console.log('promise for tournee fulfilled')
                console.log('data recieved : ', response.data)
                setNurseries(response.data)
            })
            .catch(error => {
                console.log('fail :', error)
            })
    }, [])    
    
    const allArticles = []
    let index = 1

    nurseries.forEach(nursery => {

        nursery.articleList.forEach(object => {

            let foundArticle = allArticles.find(existingArticle => existingArticle.name === object.article.nom)
            if (!foundArticle){
                allArticles.push({name: object.article.nom, quantity: object.quantite, id: index})
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
            'statut': nurseryStatut === 'livré' ? 'pas livré' : 'livré'
        }

        axios
            .post(`http://localhost:5000/creches/changerstatut/${nurseryName}`, newStatut)
            .then(() => {
                console.log('promise fulfilled')
                const updatedNursery = nurseries.find(nursery => nursery.creche.nom === nurseryName)
                updatedNursery.creche.statut = newStatut.statut
                setNurseries(nurseries.map(nursery => nursery.creche.nom !== nurseryName ? nursery : updatedNursery))
            })
            .catch(error => {
                console.log('fail : ', error)
            })
    }

    return (
        <div className="deliver-container" style={{color: 'black'}}>
            <button onClick={() => navigate('/round')}> Retour </button>
            <h3>Crèches de la tournée</h3>
            <div className='nurseries-scroller'>
                {nurseries.length > 0 ? (
                    <>
                        {nurseries.map((nursery, index) => {
                            return (
                                <div className='scroller-item' key={index}>
                                    <Link className='link-style' to={`/round/${roundName}/${nursery.creche.nom}`}>                            
                                        <p>{nursery.creche.nom}</p>
                                    </Link>
                                    <button onClick={() => {handleChangeStatut(nursery.creche.nom, nursery.creche.statut)}} className={nursery.creche.statut === 'livré' ? 'statut-button-delivered' : 'statut-button-not-delivered'}> 
                                        {nursery.creche.statut} 
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
                                <p className='article' key={article.id}>{article.name}: {article.quantity}</p>
                            )
                        })}
                    </>
                ) : (
                    <div style={{textAlign: 'center'}}>C'est vide...</div>
                )}
                
            </div>
        </div>
    )
}

export default DeliverPage