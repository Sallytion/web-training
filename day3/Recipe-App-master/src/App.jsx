import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import RecipeCard from './components/RecipeCard';
import RecipePage from './components/RecipePage';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

const App = () => {
  const [searchResults, setSearchResults] = useState([]); 

  useEffect(() => {
    fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=b4f1f2e180e9491698f72f1ad188000c')
      .then(response => response.json())
      .then(data => setSearchResults(data.results));
  }, []);

  const handleSearch = (searchTerm) => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=b4f1f2e180e9491698f72f1ad188000c`)
      .then(response => response.json())
      .then(data => setSearchResults(data.results));
  };

  return (
    <Router>
      <Container>
        <h1>Yash's Recipies</h1>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route exact path="/" element={<RecipeCard recipes={searchResults} />} /> 
          <Route path="/recipe/:id" element={<RecipePage />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
};

export default App;