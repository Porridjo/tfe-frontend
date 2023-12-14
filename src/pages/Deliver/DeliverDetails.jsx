import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import '../../stylesheets/DeliverPage.css'
import nurseryService from "../../services/nurseries"

const DeliverDetails = () => {

    const [nursery, setNursery] = useState([])
    const { roundname, nurseryname } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        nurseryService
            .getOneNursery(nurseryname)
            .then(foundNursery => {
                setNursery(foundNursery)
            })
    }, [])

    const articles = []
    let index = 1

    nursery.forEach(object => {
        object.articleList.forEach(articleItem => {
            articles.push({name: articleItem.article.nom, quantity: articleItem.quantite, unit: articleItem?.unite, id: index})
            index++
        })
    })

    return (
        <div className="deliver-container" style={{color: 'black'}}>
            <div className="nurseries-element">
                {nursery.length > 0 ? (
                    <>
                        <button className="button-deliver" onClick={() => navigate(`/round/${roundname}`)}> Retour </button>
                        <h3>{nursery[0].creche.nom}</h3>
                        <div className="articles-scroller">
                            {articles.map((article) => (
                                <div key={article.id}>
                                    <p className="article">{article.name} : {article.quantity} {article.unit !== undefined && article.unit} </p>
                                </div>
                            ))}
                        </div>
                        <h3>Informations sur la crèche</h3>
                        <div className="info">
                            <div className="info-nursery">
                                <p className="small-linespacing">Adresse :</p>
                                <p>{nursery[0].creche.adresse}</p>
                            </div>
                            <div className="info-nursery">
                                <p>Status : {nursery[0].creche.statut === undefined ? 'Pas de statut' : nursery[0].creche.statut}</p>
                            </div>
                            {nursery[0].creche.telephone !== undefined ? (
                                <div className="info-nursery">
                                    <p>Téléphone : {nursery[0].creche.telephone}</p>
                                </div>
                            ) : null}
                        </div>
                    </>
                ) : (
                    <div>Loading ...</div>
                )}
            </div>
        </div>
    )
}

export default DeliverDetails