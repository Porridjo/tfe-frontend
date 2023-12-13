import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from 'react-router-dom'

const AddOrderPage2 = ({ formData }) => {
  const [orderedArticles, setOrderedArticles] = useState([])
  const [articles, setArticles] = useState([])

  const [formData2, setFormData2] = useState({
    name: "",
    quantity: "",
  })

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

  console.log(formData2)
  console.log(formData)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData2(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
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

  const saveOrder = () => {
    console.log("je vais dormir")
  }

  return (
    <>
      <Link to="/round/addround/addorder">
        <button>Retour</button>
      </Link>
      <button onClick={saveOrder}>Enregistrer</button>
      <ul>
      {orderedArticles.map((orderedArticle, index) => <li key={index}>{orderedArticle.name} {orderedArticle.quantity}</li>)}
      </ul>
      
      <select name="name" value={formData2.name} onChange={handleOnChange}>
        {articles.map((article, index) => <option key={index}>{article.article.nom}</option>)}
      </select>
      <input name="quantity" type="text" value={formData2.quantity} onChange={handleOnChange} />
      <button onClick={addArticle}>Ajouter un article</button>
    </>
    
  )
}

export default AddOrderPage2