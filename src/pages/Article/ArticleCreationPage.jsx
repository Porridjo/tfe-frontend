import axios from "axios"
import { useState, useEffect } from "react"
import '/src/stylesheets/ArticleCreationPage.css'
import articleService from '/src/services/articles.js'

const ArticleCreationPage = () => {
  const [articles, setArticles] = useState([])

  const [newArticle, setNewArticle] = useState("")

  useEffect(() => {
    articleService
      .getAllArticles()
      .then(articles => setArticles(articles))
  }, [])

  const deleteArticle = (articleName) => {
    articleService
      .deleteOneArticle(articleName)
      .then(() => setArticles(prevArticles => [...prevArticles].filter((article) => article.article.nom !== articleName)))
  }

  const handleOnChange = (e) => {
    setNewArticle(e.target.value)
  }

  const addArticle = () => {
    if (newArticle === "") {
      alert("Entrez un nom d'article")
      return;
    }

    articleService
      .addOneArticle({nom: newArticle})
      .then(response => setArticles(prevArticles => [...prevArticles, response]))
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