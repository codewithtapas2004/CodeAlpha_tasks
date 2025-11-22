
import React from 'react';
import { ProjectIcon, UserGroupIcon } from './icons';

interface HeaderProps {
  projectName: string;
}

export const Header: React.FC<HeaderProps> = ({ projectName }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-4 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
          <ProjectIcon className="w-6 h-6" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">ProjectFlow</span>
        </div>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{projectName}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2">
          <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://picsum.photos/id/1005/32/32" alt="User avatar" />
          <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://picsum.photos/id/1027/32/32" alt="User avatar" />
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 ring-2 ring-white dark:ring-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300">
            +3
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
          <UserGroupIcon className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
    </header>
  );
};
