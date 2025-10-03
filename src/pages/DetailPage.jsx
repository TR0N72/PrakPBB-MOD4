import React, { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import { ChevronLeft, Heart } from 'lucide-react';

const DetailPage = ({ recipeId, recipeType, onNavigate, previousPage }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (recipeId) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(recipeId)) {
      updatedFavorites = updatedFavorites.filter(id => id !== recipeId);
    } else {
      updatedFavorites.push(recipeId);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  let recipe;

  if (recipeType === 'makanan') {
    recipe = Object.values(ResepMakanan.resep).find(r => r.id === recipeId);
  } else if (recipeType === 'minuman') {
    recipe = Object.values(ResepMinuman.resep).find(r => r.id === recipeId);
  }

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Resep tidak ditemukan.</p>
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <img 
            src={recipe.image_url} 
            alt={recipe.name} 
            className="w-full h-64 md:h-96 object-cover rounded-b-3xl shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-3xl"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-10">
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-wide">
              {recipe.name}
            </h1>
          </div>
          <button 
            onClick={() => onNavigate(previousPage)} 
            className="absolute top-6 left-6 flex items-center space-x-2 bg-white/80 hover:bg-white text-gray-800 font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <button 
            onClick={() => toggleFavorite(recipe.id)} 
            className="absolute top-6 right-6 bg-white/80 p-2 rounded-full backdrop-blur-sm transition-colors duration-300 hover:bg-white"
          >
            <Heart className={`w-5 h-5 ${favorites.includes(recipe.id) ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
          </button>
        </div>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Bahan-bahan</h2>
              <ul className="space-y-3 list-disc list-inside text-gray-700 text-lg">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Langkah-langkah</h2>
              <ol className="space-y-4 list-decimal list-inside text-gray-700 text-lg">
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
