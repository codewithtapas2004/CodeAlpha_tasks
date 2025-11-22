
export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  comments: Comment[];
}

export type ColumnId = 'todo' | 'in-progress' | 'done';

export interface ColumnData {
  id: ColumnId;
  title: string;
  tasks: Task[];
}

export interface BoardData {
  id: string;
  name: string;
  columns: Map<ColumnId, ColumnData>;
}
