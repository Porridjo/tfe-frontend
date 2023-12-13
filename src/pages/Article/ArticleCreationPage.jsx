import axios from "axios"
import { useState, useEffect } from "react"
import '/src/stylesheets/ArticleCreationPage.css'

const ArticleCreationPage = () => {
  const [articles, setArticles] = useState([])

  const [newArticle, setNewArticle] = useState("")

  const token = JSON.parse(localStorage.getItem('user'))?.access_token;

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/articles/', headers)
      .then(response => setArticles(response.data))
      .catch(error => console.log(error))
  }, [])

  const deleteArticle = (articleName) => {
    axios
      .delete(`http://localhost:5000/articles/${articleName}`, headers)
      .then(response => console.log(response.data))
      .then(() => setArticles(prevArticles => [...prevArticles].filter((article) => article.article.nom !== articleName)))
      .catch(error => console.log(error))
    
    
  }

  const handleOnChange = (e) => {
    setNewArticle(e.target.value)
  }

  const addArticle = () => {
    if (newArticle === "") {
      alert("Entrez un nom d'article")
      return;
    }

    axios
      .post('http://localhost:5000/articles/', {nom: newArticle}, headers)
      .then(response => setArticles(prevArticles => [...prevArticles, response.data[0]]))
      .catch(error => console.log(error))

    setNewArticle('')
  }

  return (
    <>
      <ul className="article-list">
        {articles.map((article, index) => (
          <li key={index}>
            <p>{article.article.nom}</p>
            <button onClick={() => deleteArticle(article.article.nom)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <div>
        <p>Ajouter un nouvel article:</p>
        <div>
          <input type="text" value={newArticle} onChange={handleOnChange} required />
          <button onClick={addArticle}>Ajouter l'article</button>
        </div>
      </div>
    </>
  )
}
  
export default ArticleCreationPage