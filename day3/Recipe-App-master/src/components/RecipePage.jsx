import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../index.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=b4f1f2e180e9491698f72f1ad188000c`)
      .then(response => response.json())
      .then(data => setRecipe(data));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const { title, image, summary, extendedIngredients, analyzedInstructions } = recipe;

  return (
    <Container>
      <Row>
        <Col>
          <div className="recipe-details">
            <div className="image-container">
              <img src={image} alt={title} />
            </div>
            <div className="recipe-info">
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: summary }} />
              <div className="recipe-section">
                <h5>Ingredients</h5>
                <ul className="ingredients-list">
                  {extendedIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original}</li>
                  ))}
                </ul>
              </div>
              <div className="recipe-section">
                <h5>Instructions</h5>
                <ol>
                  {analyzedInstructions[0]?.steps.map((step, index) => (
                    <li key={index}>{step.step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetails;