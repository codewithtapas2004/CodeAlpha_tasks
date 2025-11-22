import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-center md:text-left text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
            </p>
            <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Terms</a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Privacy</a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;