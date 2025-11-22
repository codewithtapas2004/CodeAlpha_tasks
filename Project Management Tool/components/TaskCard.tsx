
import React from 'react';
import type { Task } from '../types';
import { CommentIcon } from './icons';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="p-3 bg-white dark:bg-gray-700 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
    >
      <p className="font-medium text-gray-800 dark:text-gray-200">{task.title}</p>
      {task.comments.length > 0 && (
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <CommentIcon className="w-4 h-4 mr-1"/>
              <span>{task.comments.length}</span>
          </div>
      )}
    </div>
  );
};
