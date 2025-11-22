
import React, { useState, useCallback } from 'react';
import type { Task, ColumnId, Comment as CommentType } from '../types';
import { generateTaskDescription } from '../services/geminiService';
import { DescriptionIcon, CommentIcon, CloseIcon, SparklesIcon } from './icons';

interface TaskModalProps {
  task: Task;
  columnId: ColumnId;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onUpdateTask }) => {
  const [description, setDescription] = useState(task.description);
  const [newComment, setNewComment] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  
  const handleDescriptionBlur = () => {
    if (description !== task.description) {
        onUpdateTask({ ...task, description });
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: CommentType = {
        id: `comment-${Date.now()}`,
        author: 'Current User', // Mock user
        text: newComment.trim(),
        timestamp: new Date().toISOString(),
      };
      onUpdateTask({ ...task, comments: [...task.comments, comment] });
      setNewComment('');
    }
  };
  
  const handleGenerateDescription = useCallback(async () => {
    setIsGenerating(true);
    try {
        const generatedDesc = await generateTaskDescription(task.title);
        if (generatedDesc) {
            setDescription(generatedDesc);
            onUpdateTask({ ...task, description: generatedDesc });
        }
    } catch(error) {
        console.error("Error generating description:", error);
        // You can add a user-facing error message here
    } finally {
        setIsGenerating(false);
    }
  }, [task, onUpdateTask]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <CloseIcon className="w-6 h-6 text-gray-600 dark:text-gray-400"/>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {/* Description Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <DescriptionIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Description</h3>
            </div>
            <textarea
              className="w-full p-2 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
              placeholder="Add a more detailed description..."
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
            />
            <button
              onClick={handleGenerateDescription}
              disabled={isGenerating}
              className="mt-2 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
              <SparklesIcon className="w-5 h-5 mr-2"/>
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>

          {/* Comments Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <CommentIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Comments</h3>
            </div>
            <div className="space-y-4">
              {task.comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <img className="w-8 h-8 rounded-full" src={`https://i.pravatar.cc/32?u=${comment.author}`} alt={comment.author} />
                  <div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{comment.author}</p>
                      <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex items-start space-x-3">
                 <img className="w-8 h-8 rounded-full" src="https://picsum.photos/id/1005/32/32" alt="Current User" />
                 <div className="flex-grow">
                    <textarea
                        className="w-full p-2 border rounded-md shadow-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleAddComment} className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Save
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
