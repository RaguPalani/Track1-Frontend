import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import FoodDetails from './pages/FoodDetails';


function App() {
  const [favorites, setFavorites] = useState([]);
 

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteRecipes');
     if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
   
  }, []);

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  
  const addToFavorites = (recipe) => {
    if (!favorites.some(fav => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter(recipe => recipe.id !== recipeId));
  };



  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="min-h-screen bg-background w-4/5 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  favorites={favorites} 
                  removeFromFavorites={removeFromFavorites} 
                />
              } 
            />
            <Route 
              path="/recipe/:id" 
              element={
                <FoodDetails 
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                  removeFromFavorites={removeFromFavorites}
                />
              } 
            />
           </Routes> 
           
        </main>
      </div>
    </Router>
  );
}

export default App;
