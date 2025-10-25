import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock data - in a real app, this would come from an API based on the ID
const recipeData = {
  1: {
    id: 1,
    title: "Sambar (South Indian Lentil Curry)",
    image: "https://www.kamalascorner.com/wp-content/uploads/2025/02/milagai-killi-potta-sambar-750x500.jpg",
    description: "A flavorful South Indian curry made with lentils, tamarind, and mixed vegetables.",
    prepTime: "20 mins",
    cookTime: "25 mins",
    totalTime: "45 mins",
    difficulty: "Medium",
    rating: 4.7,
    servings: 4,
    category: "Lunch",
    ingredients: [
      "1 cup toor dal (pigeon peas)",
      "2 tbsp sambar powder",
      "1/2 cup tamarind juice",
      "1 cup mixed vegetables (drumstick, carrot, beans)",
      "1 onion, chopped",
      "1 tomato, chopped",
      "2 tbsp oil",
      "1 tsp mustard seeds",
      "Few curry leaves",
      "Salt to taste"
    ],
    instructions: [
      "Pressure cook dal until soft and mash it well.",
      "Heat oil, add mustard seeds and curry leaves.",
      "Add onion and tomato; sauté till soft.",
      "Add vegetables and sambar powder; cook till tender.",
      "Add tamarind juice and mashed dal; mix well.",
      "Simmer for 10 minutes and garnish with coriander leaves."
    ],
    nutrition: {
      calories: 210,
      protein: "10g",
      carbs: "30g",
      fat: "7g"
    }
  },

  2: {
    id: 2,
    title: "Idli with Pudina-chutney",
    image: "https://images.unsplash.com/photo-1654673584148-49fa03e2dd60?w=800&h=600&fit=crop",
    description: "Soft, fluffy South Indian breakfast made with fermented rice and urad dal batter.",
    prepTime: "10 hrs",
    cookTime: "10 mins",
    totalTime: "10 hrs 10 mins",
    difficulty: "Easy",
    rating: 4.9,
    servings: 4,
    category: "Breakfast",
    ingredients: [
      "2 cups idli rice",
      "1 cup urad dal",
      "Salt to taste",
      "Water as needed"
    ],
    instructions: [
      "Soak rice and dal separately for 4–6 hours.",
      "Grind them to a smooth batter; mix and ferment overnight.",
      "Add salt, mix well and pour into idli molds.",
      "Steam for 10 minutes and serve with chutney or sambar."
    ],
    nutrition: {
      calories: 180,
      protein: "5g",
      carbs: "35g",
      fat: "2g"
    }
  },

  3: {
    id: 3,
    title: "Dosa (Crispy Rice Crepe)",
    image: "https://www.kamalascorner.com/wp-content/uploads/2023/05/8052C5DE-230B-4294-94B2-EA56BCD8233E-750x500.jpeg",
    description: "A thin, crispy crepe made from fermented rice and urad dal batter.",
    prepTime: "10 hrs",
    cookTime: "5 mins",
    totalTime: "10 hrs 5 mins",
    difficulty: "Easy",
    rating: 4.8,
    servings: 4,
    category: "Breakfast",
    ingredients: [
      "2 cups dosa rice",
      "1 cup urad dal",
      "1 tsp fenugreek seeds",
      "Salt to taste",
      "Oil for cooking"
    ],
    instructions: [
      "Soak rice, dal, and fenugreek seeds for 6 hours.",
      "Grind and ferment overnight.",
      "Add salt and mix well.",
      "Spread batter thinly on a hot tawa; drizzle oil and cook till crisp."
    ],
    nutrition: {
      calories: 200,
      protein: "6g",
      carbs: "38g",
      fat: "3g"
    }
  },

  4: {
    id: 4,
    title: "Pongal (Ven Pongal)",
    image: "https://www.kamalascorner.com/wp-content/uploads/2024/01/paal-pongal-750x500.jpg",
    description: "A comforting South Indian dish made with rice, moong dal, ghee, and black pepper.",
    prepTime: "10 mins",
    cookTime: "20 mins",
    totalTime: "30 mins",
    difficulty: "Easy",
    rating: 4.6,
    servings: 3,
    category: "Breakfast",
    ingredients: [
      "1/2 cup raw rice",
      "1/4 cup moong dal",
      "2 tbsp ghee",
      "1 tsp black pepper",
      "1 tsp cumin seeds",
      "Few cashew nuts",
      "Salt to taste"
    ],
    instructions: [
      "Dry roast moong dal till golden.",
      "Cook rice and dal together till soft.",
      "Heat ghee, fry cashews, pepper, and cumin.",
      "Add to cooked rice-dal mixture and mix well."
    ],
    nutrition: {
      calories: 320,
      protein: "10g",
      carbs: "45g",
      fat: "10g"
    }
  },

  5: {
    id: 5,
    title: "Chicken Chettinad",
    image: "https://swatisani.net/kitchen/wp-content/uploads/2015/10/IMG_9350.jpg",
    description: "A spicy and aromatic chicken curry from the Chettinad region of Tamil Nadu.",
    prepTime: "20 mins",
    cookTime: "30 mins",
    totalTime: "50 mins",
    difficulty: "Hard",
    rating: 4.9,
    servings: 4,
    category: "Dinner",
    ingredients: [
      "500g chicken pieces",
      "2 onions, sliced",
      "2 tomatoes, chopped",
      "2 tbsp Chettinad masala",
      "2 tbsp oil",
      "1 tsp ginger-garlic paste",
      "Salt to taste",
      "Curry leaves"
    ],
    instructions: [
      "Heat oil, add onions and curry leaves, sauté till golden.",
      "Add ginger-garlic paste and tomatoes; cook till soft.",
      "Add Chettinad masala and chicken pieces.",
      "Cook until chicken is done and masala thickens."
    ],
    nutrition: {
      calories: 480,
      protein: "35g",
      carbs: "10g",
      fat: "30g"
    }
  },

  6: {
    id: 6,
    title: "Curd Rice (Thayir Sadam)",
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/curd-rice-thayir-sadam.jpg",
    description: "A cooling South Indian dish made by mixing rice with curd and tempering.",
    prepTime: "10 mins",
    cookTime: "15 mins",
    totalTime: "25 mins",
    difficulty: "Easy",
    rating: 4.5,
    servings: 3,
    category: "Lunch",
    ingredients: [
      "1 cup cooked rice",
      "1 cup thick curd",
      "1 tsp mustard seeds",
      "1 green chili, chopped",
      "1 tbsp grated carrot",
      "Few curry leaves",
      "Salt to taste"
    ],
    instructions: [
      "Mash the rice and mix with curd and salt.",
      "Heat oil, add mustard seeds, chili, and curry leaves.",
      "Pour tempering over the curd rice and mix well.",
      "Garnish with grated carrot and serve chilled."
    ],
    nutrition: {
      calories: 240,
      protein: "7g",
      carbs: "38g",
      fat: "6g"
    }
  },

  7: {
    id: 7,
    title: "Prawn Masala",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjiVwT8iiElUhnm2pNYxWY_VSTN1YeEPJw2g&s",
    description: "A spicy seafood curry made with fresh prawns and South Indian spices.",
    prepTime: "15 mins",
    cookTime: "20 mins",
    totalTime: "35 mins",
    difficulty: "Medium",
    rating: 4.7,
    servings: 4,
    category: "Dinner",
    ingredients: [
      "500g prawns, cleaned",
      "2 onions, chopped",
      "2 tomatoes, chopped",
      "1 tbsp ginger-garlic paste",
      "1 tbsp chili powder",
      "1 tsp turmeric",
      "Curry leaves",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil, add onions and sauté till golden.",
      "Add ginger-garlic paste and tomatoes; cook till soft.",
      "Add spices and cleaned prawns.",
      "Cook till prawns turn pink and masala thickens."
    ],
    nutrition: {
      calories: 350,
      protein: "30g",
      carbs: "10g",
      fat: "20g"
    }
  },

  8: {
    id: 8,
    title: "Rasam",
    image: "https://www.kamalascorner.com/wp-content/uploads/2007/07/Rasam-750x500.jpg",
    description: "A tangy South Indian soup made with tamarind, tomato, and pepper.",
    prepTime: "10 mins",
    cookTime: "15 mins",
    totalTime: "25 mins",
    difficulty: "Easy",
    rating: 4.6,
    servings: 3,
    category: "Lunch",
    ingredients: [
      "1 tomato, chopped",
      "1 tbsp tamarind juice",
      "1 tsp rasam powder",
      "1 tsp mustard seeds",
      "1 tsp cumin seeds",
      "Few curry leaves",
      "Salt to taste"
    ],
    instructions: [
      "Boil tamarind juice with tomato and rasam powder.",
      "Add salt and simmer for 10 minutes.",
      "Prepare tempering with mustard, cumin, and curry leaves.",
      "Pour over rasam and serve hot with rice."
    ],
    nutrition: {
      calories: 90,
      protein: "3g",
      carbs: "12g",
      fat: "3g"
    }
  },

  9: {
    id: 9,
    title: "Vegetable Biryani",
    image: "https://www.kamalascorner.com/wp-content/uploads/2016/01/Tomato-Rice-750x500.jpg",
    description: "A flavorful rice dish cooked with vegetables, spices, and herbs.",
    prepTime: "20 mins",
    cookTime: "30 mins",
    totalTime: "50 mins",
    difficulty: "Medium",
    rating: 4.8,
    servings: 4,
    category: "Lunch",
    ingredients: [
      "1 cup basmati rice",
      "1 cup mixed vegetables",
      "1 onion, sliced",
      "1 tomato, chopped",
      "1 tbsp biryani masala",
      "1 tbsp ghee",
      "Mint and coriander leaves"
    ],
    instructions: [
      "Sauté onion and tomato in ghee.",
      "Add vegetables and biryani masala; cook for few minutes.",
      "Add soaked rice and water; cook till rice is done.",
      "Garnish with mint and coriander."
    ],
    nutrition: {
      calories: 400,
      protein: "9g",
      carbs: "65g",
      fat: "10g"
    }
  },

  10: {
    id: 10,
    title: "Parotta with Salna",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed-w6V4m9IBWeVTQiHYTLxYTW67V9tEC-iw&s",
    description: "Flaky layered flatbread served with spicy salna (gravy).",
    prepTime: "30 mins",
    cookTime: "20 mins",
    totalTime: "50 mins",
    difficulty: "Hard",
    rating: 4.9,
    servings: 3,
    category: "Dinner",
    ingredients: [
      "2 cups maida (all-purpose flour)",
      "2 tbsp oil",
      "Salt to taste",
      "Water as needed",
      "For salna: onion, tomato, spices, and coconut paste"
    ],
    instructions: [
      "Knead dough with flour, salt, and oil. Rest for 30 mins.",
      "Roll and fold to form layers, then cook on tawa with oil.",
      "For salna, sauté onion, tomato, and spices; grind coconut paste and add.",
      "Cook till gravy thickens and serve with parotta."
    ],
    nutrition: {
      calories: 550,
      protein: "10g",
      carbs: "70g",
      fat: "25g"
    }
  }
};


const FoodDetails = ({ addToFavorites, favorites, removeFromFavorites }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate API call
    const foundRecipe = recipeData[id];
    setRecipe(foundRecipe);
    
    if (foundRecipe) {
      setIsFavorite(favorites.some(fav => fav.id === foundRecipe.id));
    }
  }, [id, favorites]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
    setIsFavorite(!isFavorite);
  };

  if (!recipe) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
        <p className="text-gray-600 mb-8">The recipe you're looking for doesn't exist.</p>
        <Link 
          to="/search" 
          className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors duration-200"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <Link 
        to="/search" 
        className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors duration-200"
      >
        <svg 
          className="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
        Back to Recipes
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Recipe Header */}
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <button
            onClick={handleFavoriteToggle}
            className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-colors duration-200 ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <svg 
              className="w-6 h-6" 
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

        <div className="p-8">
          {/* Recipe Title and Info */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-5 h-5 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span><strong>Prep:</strong> {recipe.prepTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-5 h-5 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span><strong>Cook:</strong> {recipe.cookTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-5 h-5 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span><strong>Total:</strong> {recipe.totalTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-5 h-5 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                <span><strong>Servings:</strong> {recipe.servings}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-5 h-5 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
                <span><strong>Difficulty:</strong> {recipe.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg 
                  className="w-6 h-6 mr-3 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                  />
                </svg>
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg 
                  className="w-6 h-6 mr-3 text-orange-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                  />
                </svg>
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Nutrition Info */}
          {recipe.nutrition && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{recipe.nutrition.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{recipe.nutrition.protein}</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{recipe.nutrition.carbs}</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{recipe.nutrition.fat}</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;