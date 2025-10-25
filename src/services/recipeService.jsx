import recipeData from '../data/recipeData.json';

// Get all recipes
export const getAllRecipes = () => {
  return recipeData.recipes;
};

// Get recipe by ID
export const getRecipeById = (id) => {
  return recipeData.recipes.find(recipe => recipe.id === parseInt(id));
};

// Get featured recipes (first 8 recipes)
export const getFeaturedRecipes = () => {
  return recipeData.recipes.slice(0, 8);
};

// Get recipes by category
export const getRecipesByCategory = (category) => {
  if (category === 'All') return recipeData.recipes;
  
  if (category === 'Vegetarian') {
    return recipeData.recipes.filter(recipe => 
      !['Chicken Chettinad', 'Prawn Masala'].includes(recipe.title)
    );
  }
  
  if (category === 'Non-Veg') {
    return recipeData.recipes.filter(recipe => 
      ['Chicken Chettinad', 'Prawn Masala'].includes(recipe.title)
    );
  }
  
  return recipeData.recipes.filter(recipe => recipe.category === category);
};

// Search recipes by title
export const searchRecipes = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return recipeData.recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(lowercaseQuery) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(lowercaseQuery)
    )
  );
};

// Get unique categories
export const getCategories = () => {
  const categories = [...new Set(recipeData.recipes.map(recipe => recipe.category))];
  return ['All', ...categories, 'Vegetarian', 'Non-Veg'];
};