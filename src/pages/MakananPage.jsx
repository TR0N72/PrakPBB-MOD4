// src/pages/MakananPage.jsx
import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function MakananPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3;

  const allMakanan = Object.values(ResepMakanan.resep);

  useEffect(() => {
    const filter = () => {
      let recipes = allMakanan;
      if (searchQuery.trim() !== '') {
        const lowercasedQuery = searchQuery.toLowerCase();
        if (filterType === 'name') {
          recipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(lowercasedQuery)
          );
        } else if (filterType === 'ingredient') {
          recipes = recipes.filter(recipe => 
            recipe.ingredients.some(ingredient => 
              ingredient.toLowerCase().includes(lowercasedQuery)
            )
          );
        }
      }
      setFilteredRecipes(recipes);
      setCurrentPage(1); // Reset to first page on search
    };

    filter();
  }, [searchQuery, filterType]);

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex justify-center mb-8 space-x-4">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="name">Name</option>
            <option value="ingredient">Ingredient</option>
          </select>
          <input
            type="text"
            placeholder={`Filter by ${filterType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
        <RecipeGrid recipes={currentRecipes} onNavigate={onNavigate} />
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300">
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}