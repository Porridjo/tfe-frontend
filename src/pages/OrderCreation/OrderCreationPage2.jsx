import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import "/src/stylesheets/AddOrderPage.css"

const OrderCreationPage2 = ({ formData, setNurseries }) => {
  const [orderedArticles, setOrderedArticles] = useState([])
  const [articles, setArticles] = useState([])
  const [formData2, setFormData2] = useState({
    name: "",
    quantity: "",
  })

  const navigate = useNavigate();

  const token = localStorage.getItem('user');

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/articles/', headers)
      .then(response => setArticles(response.data))
  }, [])

  console.log(orderedArticles)

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
    <>
      <Link to="/round/create-round/addorder">
        <button>Retour</button>
      </Link>
      <button onClick={saveOrder}>Enregistrer</button>
      <div className="order-list">
        <ul>
        {orderedArticles.map((orderedArticle, index) => {
          return (
            <li key={index} className="article-li">
              <div>{orderedArticle.name}</div>
              <input type="number" value={orderedArticle.quantity} onChange={(e) => handleOnChangeOrderedArticles(e, index)}/>
              <button onClick={() => deleteArticle(index)}>Supprimer</button>
            </li>
          )})}
        </ul>
      </div>
      
      
      <select name="name" value={formData2.name} onChange={handleOnChange}>
        <option>Sélectionner un article</option>
        {articles.map((article, index) => <option key={index}>{article.article.nom}</option>)}
      </select>
      <input name="quantity" type="number" value={formData2.quantity} onChange={handleOnChange} min="0" />
      <button onClick={addArticle}>Ajouter un article</button>
    </>
    
  )
}

export default OrderCreationPage2