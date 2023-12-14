import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../stylesheets/DeliverPage.css";
import "../../stylesheets/ModifyCommand.css";
import "../../stylesheets/position.css";
import nurseryService from "../../services/nurseries";

const ModifyCommand = () => {
  const [nursery, setNursery] = useState([]);
  const { roundname, nurseryname } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

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

  const handleQuantityChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].quantity = value;
    const filtredArticles = newArticles.filter(article => article.quantity !== 0);
    setArticles(filtredArticles);
  };

  const handleSave = () => {
    nurseryService.updateNursery(nurseryname, articles);
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
        </>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
};

export default ModifyCommand;
