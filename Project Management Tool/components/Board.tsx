
import React from 'react';
import type { BoardData, ColumnData, ColumnId, Task } from '../types';
import { Column } from './Column';

interface BoardProps {
  boardData: BoardData;
  onOpenTaskModal: (task: Task, columnId: ColumnId) => void;
  onAddTask: (columnId: ColumnId, title: string) => void;
  onMoveTask: (taskId: string, sourceColumnId: ColumnId, destColumnId: ColumnId) => void;
}

export const Board: React.FC<BoardProps> = ({ boardData, onOpenTaskModal, onAddTask, onMoveTask }) => {
  const [draggedItem, setDraggedItem] = React.useState<{taskId: string; sourceColumnId: ColumnId} | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string, sourceColumnId: ColumnId) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
    setDraggedItem({ taskId, sourceColumnId });
  };

  const handleDrop = (destColumnId: ColumnId) => {
    if (draggedItem) {
      onMoveTask(draggedItem.taskId, draggedItem.sourceColumnId, destColumnId);
      setDraggedItem(null);
    }
  };

  return (
    <div className="grid grid-flow-col auto-cols-xs md:auto-cols-sm gap-4">
      {/* FIX: Explicitly type `column` to fix type inference issue when iterating over map values. */}
      {Array.from(boardData.columns.values()).map((column: ColumnData) => (
        <Column
          key={column.id}
          column={column}
          onOpenTaskModal={onOpenTaskModal}
          onAddTask={onAddTask}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};
