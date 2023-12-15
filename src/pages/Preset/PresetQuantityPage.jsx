import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import articleService from "../../services/articles";
import nurseryService from "../../services/nurseries";
import "/src/stylesheets/PresetQuantityPage.css"

const PresetQuantityPage = () => {
  const [orderedArticles, setOrderedArticles] = useState([])
  const [articles, setArticles] = useState([]);
  const { roundname, nurseryname } = useParams();
  const [nursery, setNursery] = useState();
  const [formData, setFormData] = useState({
    name: "",
    quantity: 1,
  })
  const navigate = useNavigate();

  useEffect(() => {
    articleService
      .getAllArticles()
      .then(response => setArticles(response))
  }, [])

  useEffect(()=> {
    nurseryService
    .getOneNurseryDefault(nurseryname)
    .then(foundNursery => {
        setNursery(foundNursery)
        const articlesTemp = [];
        foundNursery.forEach((object) => {
          object.articleDefaultList.forEach((articleItem) => {
        
            articlesTemp.push({
              name: articleItem.article.nom,
              quantity: articleItem.quantite,
            });
          });
        });
        setOrderedArticles(articlesTemp);
    })
  }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData(prevFormData => {
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
    if (formData.name === "") {
      alert('Sélectionner un article')
      return;
    }

    const articleExists = articles.some(article => article.name === formData.name);

    if (articleExists) {
      alert('Cet article est déjà dans la liste');
      return;
    }

    const newArticle = {
      name: formData.name,
      quantity: formData.quantity,
    }
    setOrderedArticles(prevState => {
      return [...prevState, newArticle ]
    })
  }

  const deleteArticle = (index) => {
    const newArray = [...orderedArticles].filter((article, i) => i !== index)
    setOrderedArticles(newArray)
  }

  const handleSave = () => {
    nurseryService.updateNurseryDefault(nurseryname, orderedArticles).then(response => console.log(response));
    navigate(`/round/${roundname}/preset`);
  };

  return (
    <div className="preset-modification-container">
      <div className="preset-quantity-header">
        <div className="add-article-section-preset">
          <select name="name" value={formData.name} onChange={handleOnChange}>
            <option>Sélectionner un article</option>
            {articles.map((article, index) => <option key={index}>{article.article.nom}</option>)}
          </select>
          <p>Quantité:</p>
          <input name="quantity" type="number" value={formData.quantity} onChange={handleOnChange} min="0" />
          <button  onClick={addArticle}>Ajouter l'article</button>
        </div>
        <button className="save-default-btn" onClick={handleSave}>Enregistrer</button>
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
              <tr key={index} >
                <td>
                  <div>{orderedArticle.name}</div>
                </td>
                <td>
                  <input className="preset-quantity-input" type="number" value={orderedArticle.quantity} onChange={(e) => handleOnChangeOrderedArticles(e, index)}/>
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
  )
}

export default PresetQuantityPage