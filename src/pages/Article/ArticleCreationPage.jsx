import { useState, useEffect } from "react"
import '/src/stylesheets/ArticleCreationPage.css'
import articleService from '/src/services/articles.js'
import { Link } from "react-router-dom"

const ArticleCreationPage = () => {
  const [articles, setArticles] = useState([])

  const [newArticle, setNewArticle] = useState({
    nom: "",
    unité: "",
  })

  console.log(newArticle)

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
    const { name, value } = e.target
    setNewArticle(prevNewArticle => {
      return {
        ...prevNewArticle,
        [name]: value
      }
    })
  }

  const addArticle = (e) => {
    e.preventDefault()

    if (newArticle.nom.length === 0) {
      alert("Entrez un nom d'article")
      return;
    }
    if (newArticle.unité.length === 0) {
      alert("Sélectionner une unité")
      return;
    }

    articleService
      .addOneArticle(newArticle)
      .then(response => setArticles(prevArticles => [...prevArticles, response]))
    setNewArticle({
      nom: "",
      unit: "",
    })
  }

  return (
    <div className="article-creation-container">
      <div className="button-div">
        <Link to="/round">
          <button>Retour</button>
        </Link>
      </div>
      <div className="article-creation-div">
        <h2>Création d'article</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="table-article-header">Article</th>
                <th className="table-article-header">Unité</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {articles.map((article, index) => (
              <tr key={index} className="article-li">
                <td>
                  <p>{article.article.nom}</p>
                </td>
                <td>
                  <p>{article.article.unité}</p>
                </td>
                <td>
                  <button onClick={() => deleteArticle(article.article.nom)}>Supprimer</button>
                </td> 
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="article-creation-section">
          <p>Ajouter un nouvel article:</p>
          <form onSubmit={addArticle}>
            <input name="nom" type="text" value={newArticle.nom} onChange={handleOnChange} placeholder="Nom de l'article" required />
            <select name="unité" value={newArticle.unité} onChange={handleOnChange} required >
              <option>Sélectionner l'unité</option>
              <option>unité</option>
              <option>caisse</option>
            </select>
            <input type="submit" value="Ajouter l'article" />
          </form>
        </div>
      </div>
    </div>
  )
}
  
export default ArticleCreationPage