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
    
    nursery.forEach(object => {
        object.articleList.forEach(articleItem => {
            articles.push({name: articleItem.article.nom, quantity: articleItem.quantite})
        })
    })

    return (
        <div className="deliver-container" style={{color: 'black'}}>
            {nursery.length > 0 ? (
                <>
                    <button onClick={() => navigate(`/round/${roundname}`)}> Retour </button>
                    <h2>{nursery[0].creche.nom}</h2>
                    <div className="articles-scroller">
                        {articles.map((article, i) => (
                            <div key={i}>
                                <p className="article">{article.name} : {article.quantity} </p>
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
                    </div>
                </>
            ) : (
                <div>Loading ...</div>
            )}
        </div>
    )
}

export default DeliverDetails