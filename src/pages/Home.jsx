import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { getFeaturedRecipes } from '../services/recipeService';

const categories = [
  { name: "Breakfast", icon: "🥞", count: 12 },
  { name: "Lunch", icon: "🍱", count: 15 },
  { name: "Dinner", icon: "🍝", count: 10 },
  { name: "Vegetarian", icon: "🥗", count: 18 },
  { name: "Non-Veg", icon: "🍗", count: 8 },
  { name: "Quick & Easy", icon: "⚡", count: 14 }
];

const Home = () => {
  const featuredRecipes = getFeaturedRecipes();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover South Indian Delights
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Authentic South Indian recipes passed down through generations. Experience the rich flavors of Tamil Nadu!
        </p>
        <Link 
          to="/search" 
          className="inline-flex items-center px-8 py-4 bg-white text-orange-500 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Explore Recipes
          <svg 
            className="w-5 h-5 ml-2" 
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
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/search?category=${category.name}`}
              className="bg-background-paper p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 text-center group border border-background-light"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count} recipes</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured South Indian Recipes</h2>
          <Link 
            to="/search" 
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
          >
            <span>View All</span>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;