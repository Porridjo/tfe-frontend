import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import "/src/stylesheets/OrderCreationPage2.css"
import articleService from '/src/services/articles.js'

const OrderCreationPage2 = ({ formData, setNurseries }) => {
  const [orderedArticles, setOrderedArticles] = useState([])
  const [articles, setArticles] = useState([])
  const [formData2, setFormData2] = useState({
    name: "",
    quantity: 1,
  })

  const navigate = useNavigate();

  useEffect(() => {
    articleService
      .getAllArticles()
      .then(articles => setArticles(articles))
  }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData2(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  const handleOnChangeOrderedArticles = (e, index) => {

    const newArray = [...orderedArticles]

    const { value } = e.target

    newArray[index] = {...newArray[index], quantity: value}

    setOrderedArticles(newArray)
  }

  const addArticle = () => {
    if (formData2.name === "") {
      alert('Sélectionner un article')
      return;
    }

    const articleExists = articles.some(article => article.name === formData2.name);

    if (articleExists) {
      alert('Cet article est déjà dans la liste');
      return;
    }

    const newArticle = {
      name: formData2.name,
      quantity: formData2.quantity,
    }
    setOrderedArticles(prevState => {
      return [...prevState, newArticle ]
    })
  }

  const deleteArticle = (index) => {
    const newArray = [...orderedArticles].filter((article, i) => i !== index)
    setOrderedArticles(newArray)
  }

  const saveOrder = () => {
    const newNursery = {
      nom: formData.nurseryName,
      adresse: formData.nurseryAdress,
      telephone: formData.telephoneNumber,
      articles: orderedArticles,
    }
    setNurseries(prevNurseries => [...prevNurseries, newNursery])
    navigate('/round/create-round/')
  }

  return (
    <div className="order-creation2-container">
      <div className="button-div">
        <Link to="/round/create-round/addorder">
          <button>Retour</button>
        </Link>
      </div>
      <div className="order-form2">
        <h2>Ajouter des articles</h2>
        <div className="order-actions"> 
          <div className="add-article-section">
            <select name="name" value={formData2.name} onChange={handleOnChange}>
              <option>Sélectionner un article</option>
              {articles.map((article, index) => <option key={index}>{article.article.nom}</option>)}
            </select>
            <p>Quantité:</p>
            <input name="quantity" type="number" value={formData2.quantity} onChange={handleOnChange} min="0" />
            <button onClick={addArticle}>Ajouter l'article</button>
          </div>
          <button className="save-order-btn" onClick={saveOrder}>Enregistrer</button>
        </div>
        
        <div className="order-list">
          <table>
            <thead>
              <tr>
                <th>Article</th>
                <th>Quantité</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {orderedArticles.map((orderedArticle, index) => {
            return (
              <tr key={index} className="article-li">
                <td>
                  <div>{orderedArticle.name}</div>
                </td>
                <td>
                  <input type="number" value={orderedArticle.quantity} onChange={(e) => handleOnChangeOrderedArticles(e, index)}/>
                </td>
                <td>
                  <button onClick={() => deleteArticle(index)}>Supprimer</button>
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

export default OrderCreationPage2