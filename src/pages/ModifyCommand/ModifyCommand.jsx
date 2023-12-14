import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../stylesheets/DeliverPage.css";
import "../../stylesheets/position.css";
import "../../stylesheets/ModifyCommand.css";
import nurseryService from "../../services/nurseries";
import articleService from "../../services/articles";

const ModifyCommand = () => {
  const [nursery, setNursery] = useState([]);
  const { roundname, nurseryname } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [formData2, setFormData2] = useState({
    name: "",
    quantity: 1,
  })

  useEffect(() => {
    articleService
      .getAllArticles()
      .then(articles => setAllArticles(articles))
  }, [])

  useEffect(() => {
    nurseryService.getOneNursery(nurseryname).then((foundNursery) => {
      setNursery(foundNursery);

      const articlesTemp = [];

      foundNursery.forEach((object) => {
        object.articleList.forEach((articleItem) => {
          articlesTemp.push({
            name: articleItem.article.nom,
            quantity: articleItem.quantite,
          });
        });
      });

      setArticles(articlesTemp);
    });
  }, [nurseryname]);

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData2(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
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
    setArticles(prevState => {
      return [...prevState, newArticle ]
    })
  }

  const handleQuantityChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].quantity = parseFloat(value);
    const filtredArticles = newArticles.filter(article => article.quantity !== 0);
    setArticles(filtredArticles);
  };

  const handleSave = () => {
    nurseryService.updateNursery(nurseryname, articles);
    navigate(`/round/${roundname}`)
  };

  return (
    <div className="deliver-container" style={{ color: "black" }}>
      {nursery.length > 0 ? (
        <>
          <div className="horizontal-align button-bar">
            <button onClick={() => navigate(`/round/${roundname}`)}>
              Retour
            </button>
            <h2>{nursery[0].creche.nom}</h2>
            <button onClick={handleSave}> Enregistrer </button>
          </div>
          <div className="articles-scroller center-container">
            {articles.map((article, i) => (
              <div key={i}>
                <form>
                  <label htmlFor={`quantity-${i}`}>
                    {article.name} :
                    <input
                      type="number"
                      id={`quantity-${i}`}
                      value={article.quantity}
                      onChange={(e) => handleQuantityChange(i, e.target.value)}
                    />
                  </label>
                </form>
              </div>
            ))}
          </div>
          <div className="add-article-section">
            <select name="name" value={formData2.name} onChange={handleFormChange}>
              <option>Sélectionner un article</option>
              {allArticles.map((article, index) => <option key={index}>{article.article.nom}</option>)}
            </select>
            <p>Quantité:</p>
            <input name="quantity" type="number" value={formData2.quantity} onChange={handleFormChange} min="0" />
            <button onClick={addArticle}>Ajouter l'article</button>
          </div>
        </>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
};

export default ModifyCommand;
