import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-max py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Meditranslate</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/upload" className="text-gray-600 hover:text-blue-600 font-medium">
            Upload
          </Link>
          <Link to="/history" className="text-gray-600 hover:text-blue-600 font-medium">
            History
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium">
            About
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-blue-600 font-medium">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};
