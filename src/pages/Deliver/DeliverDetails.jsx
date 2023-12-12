import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import '../../stylesheets/DeliverPage.css'

const DeliverDetails = () => {

    const [nursery, setNursery] = useState([])
    const { roundname, nurseryname} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/creches/${nurseryname}`)
            .then(response => {
                console.log('promise for nursery fulfilled')
                setNursery(response.data)
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
                </>
            ) : (
                <div>Loading ...</div>
            )}
        </div>
    )
}

export default DeliverDetails