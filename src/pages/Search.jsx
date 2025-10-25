import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { searchRecipes, getRecipesByCategory, getCategories } from '../services/recipeService';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const categories = getCategories();

  useEffect(() => {
    let results = [];
    
    if (searchQuery) {
      results = searchRecipes(searchQuery);
    } else {
      results = getRecipesByCategory(selectedCategory);
    }

    setFilteredRecipes(results);
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchParams({ q: query });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'South Indian Recipes'}
        </h1>
        <p className="text-gray-600">
          {filteredRecipes.length} recipes found
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-orange-400 rounded-2xl shadow-md p-6 border border-background-light">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Recipes
            </label>
            <input
              type="text"
              placeholder="Type recipe name, ingredients..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-background-light focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background-paper"
            />
          </div>

          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-background-light focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background-paper"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍳</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Search;