
import React, { useState } from 'react';
import { Board } from './components/Board';
import { Header } from './components/Header';
import { TaskModal } from './components/TaskModal';
import { initialBoardData } from './data/mockData';
import type { BoardData, Task, ColumnId } from './types';

const App: React.FC = () => {
  const [boardData, setBoardData] = useState<BoardData>(initialBoardData);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<ColumnId | null>(null);

  const handleOpenModal = (task: Task, columnId: ColumnId) => {
    setSelectedTask(task);
    setActiveColumnId(columnId);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setActiveColumnId(null);
  };
  
  const handleUpdateTask = (updatedTask: Task) => {
    if (!activeColumnId) return;

    // FIX: Explicitly type `prevData` to ensure correct type inference for `prevData.columns`.
    setBoardData((prevData: BoardData) => {
        const newColumns = new Map(prevData.columns);
        const column = newColumns.get(activeColumnId);
        if (!column) return prevData;

        const taskIndex = column.tasks.findIndex(t => t.id === updatedTask.id);
        if (taskIndex === -1) return prevData;

        const newTasks = [...column.tasks];
        newTasks[taskIndex] = updatedTask;
        
        newColumns.set(activeColumnId, {...column, tasks: newTasks});

        return {...prevData, columns: newColumns};
    });
    setSelectedTask(updatedTask);
  };

  const handleAddTask = (columnId: ColumnId, title: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description: '',
      comments: [],
    };

    // FIX: Explicitly type `prevData` to ensure correct type inference for `prevData.columns`.
    setBoardData((prevData: BoardData) => {
      const newColumns = new Map(prevData.columns);
      const column = newColumns.get(columnId);
      if (column) {
        const newTasks = [...column.tasks, newTask];
        newColumns.set(columnId, { ...column, tasks: newTasks });
        return { ...prevData, columns: newColumns };
      }
      return prevData;
    });
  };

  const handleMoveTask = (taskId: string, sourceColumnId: ColumnId, destColumnId: ColumnId) => {
    if (sourceColumnId === destColumnId) return;

    // FIX: Explicitly type `prevData` to ensure correct type inference for `prevData.columns`.
    setBoardData((prevData: BoardData) => {
        const newColumns = new Map(prevData.columns);
        const sourceColumn = newColumns.get(sourceColumnId);
        const destColumn = newColumns.get(destColumnId);

        if (!sourceColumn || !destColumn) return prevData;

        const taskIndex = sourceColumn.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return prevData;

        const [movedTask] = sourceColumn.tasks.splice(taskIndex, 1);
        destColumn.tasks.push(movedTask);
        
        return { ...prevData, columns: newColumns };
    });
  };


  return (
    <div className="flex flex-col h-screen font-sans text-gray-800 dark:text-gray-200">
      <Header projectName={boardData.name} />
      <main className="flex-grow p-4 overflow-x-auto">
        <Board 
            boardData={boardData} 
            onOpenTaskModal={handleOpenModal} 
            onAddTask={handleAddTask}
            onMoveTask={handleMoveTask}
        />
      </main>
      {selectedTask && activeColumnId && (
        <TaskModal
          task={selectedTask}
          columnId={activeColumnId}
          onClose={handleCloseModal}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default App;
