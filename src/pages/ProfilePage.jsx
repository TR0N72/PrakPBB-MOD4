// src/pages/ProfilePage.jsx
import { User, Mail, ChefHat, LogOut } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="relative mb-6 md:mb-0">
              <img 
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                John Doe
              </h1>
              <p className="text-gray-500 mt-1">@johndoe</p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <User className="w-6 h-6 text-gray-400" />
                <span className="text-lg text-gray-700">John Doe</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-gray-400" />
                <span className="text-lg text-gray-700">john.doe@example.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <ChefHat className="w-6 h-6 text-gray-400" />
                <span className="text-lg text-gray-700">12 Resep dibuat</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 flex justify-end">
            <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}