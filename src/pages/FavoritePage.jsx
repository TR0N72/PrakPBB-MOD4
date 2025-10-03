import { useState, useEffect } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';

export default function FavoritePage({ onNavigate }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const allMakanan = Object.values(ResepMakanan.resep).map(recipe => ({ ...recipe, type: 'makanan' }));
    const allMinuman = Object.values(ResepMinuman.resep).map(recipe => ({ ...recipe, type: 'minuman' }));
    const allRecipes = [...allMakanan, ...allMinuman];

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteItems = allRecipes.filter(recipe => favorites.includes(recipe.id));
    setFavoriteRecipes(favoriteItems);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Favorite Recipes</h1>
      {favoriteRecipes.length > 0 ? (
        <RecipeGrid recipes={favoriteRecipes} onNavigate={onNavigate} />
      ) : (
        <p>You haven't added any favorite recipes yet.</p>
      )}
    </div>
  );
}
