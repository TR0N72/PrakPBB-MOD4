// src/main.jsx
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import ProfilePage from './pages/ProfilePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import FavoritePage from './pages/FavoritePage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedRecipeType, setSelectedRecipeType] = useState(null);
  const [previousPage, setPreviousPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page, recipeId = null, recipeType = null) => {
    if (page !== currentPage) {
      setPreviousPage(currentPage);
    }
    setCurrentPage(page);
    setSelectedRecipe(recipeId);
    setSelectedRecipeType(recipeType);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'makanan':
        return <MakananPage onNavigate={handleNavigation} />;
      case 'minuman':
        return <MinumanPage onNavigate={handleNavigation} />;
      case 'profile':
        return <ProfilePage />;
      case 'details':
        return <DetailPage recipeId={selectedRecipe} recipeType={selectedRecipeType} onNavigate={handleNavigation} previousPage={previousPage} />;
      case 'search':
        return <SearchPage searchQuery={searchQuery} onNavigate={handleNavigation} />;
      case 'favorites':
        return <FavoritePage onNavigate={handleNavigation} />;
      default:
        return <HomePage />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} onSearch={handleSearch} />
      
      {/* Main Content */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      
      {/* Mobile Navbar */}
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)