import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Favorite Recipes</h1>
        <p className="text-gray-600">
          {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
        </p>
      </div>

      {/* Favorites Grid */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(recipe => (
            <div key={recipe.id} className="relative">
              <RecipeCard recipe={recipe} />
              <button
                onClick={() => removeFromFavorites(recipe.id)}
                className="absolute top-4 right-4 bg-background-paper p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors duration-200 border border-background-light"
                title="Remove from favorites"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-background-paper rounded-2xl shadow-md border border-background-light">
          <div className="text-8xl mb-6">❤️</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">No favorites yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start exploring recipes and add your favorites to this collection!
          </p>
          <Link 
            to="/search" 
            className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors duration-200"
          >
            Discover Recipes
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;