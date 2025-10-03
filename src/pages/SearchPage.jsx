import { useState, useEffect } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';

export default function SearchPage({ searchQuery, onNavigate }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const allMakanan = Object.values(ResepMakanan.resep).map(recipe => ({ ...recipe, type: 'makanan' }));
      const allMinuman = Object.values(ResepMinuman.resep).map(recipe => ({ ...recipe, type: 'minuman' }));
      const allRecipes = [...allMakanan, ...allMinuman];
      const filteredRecipes = allRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRecipes);
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>
      {searchResults.length > 0 ? (
        <RecipeGrid recipes={searchResults} onNavigate={onNavigate} />
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
