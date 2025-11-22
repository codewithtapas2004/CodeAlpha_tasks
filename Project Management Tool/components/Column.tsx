
import React, { useState } from 'react';
import type { ColumnData, ColumnId, Task } from '../types';
import { TaskCard } from './TaskCard';
import { PlusIcon } from './icons';

interface ColumnProps {
  column: ColumnData;
  onOpenTaskModal: (task: Task, columnId: ColumnId) => void;
  onAddTask: (columnId: ColumnId, title: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string, sourceColumnId: ColumnId) => void;
  onDrop: (destColumnId: ColumnId) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, onOpenTaskModal, onAddTask, onDragStart, onDrop }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask(column.id, newTaskTitle.trim());
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
      setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop(column.id);
    setIsDragOver(false);
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col w-72 md:w-80 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-sm transition-colors duration-300 ${isDragOver ? 'bg-blue-100 dark:bg-blue-900/50' : ''}`}
    >
      <div className="p-3 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
        <span>{column.title}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{column.tasks.length}</span>
      </div>
      <div className="flex-grow p-2 space-y-2 min-h-[100px] overflow-y-auto">
        {column.tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onClick={() => onOpenTaskModal(task, column.id)} 
            onDragStart={(e) => onDragStart(e, task.id, column.id)}
          />
        ))}
      </div>
      <div className="p-2">
        {isAddingTask ? (
          <form onSubmit={handleAddTaskSubmit}>
            <textarea
              className="w-full p-2 border rounded-md shadow-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a title for this card..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onBlur={() => setIsAddingTask(false)}
              autoFocus
            />
            <div className="mt-2 flex items-center space-x-2">
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Add Card</button>
              <button type="button" onClick={() => setIsAddingTask(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsAddingTask(true)}
            className="w-full flex items-center space-x-2 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <PlusIcon className="w-5 h-5"/>
            <span>Add a card</span>
          </button>
        )}
      </div>
    </div>
  );
};
