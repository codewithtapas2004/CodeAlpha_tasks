
import type { BoardData, ColumnId, ColumnData } from '../types';

const initialColumns = new Map<ColumnId, ColumnData>([
  ['todo', {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: 'task-1', title: 'Design the landing page', description: 'Create mockups and wireframes for the new landing page.', comments: [] },
      { id: 'task-2', title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions for automated testing and deployment.', comments: [] },
    ],
  }],
  ['in-progress', {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { 
        id: 'task-3', 
        title: 'Develop authentication service', 
        description: 'Implement user sign-up and login functionality using JWT.',
        comments: [
          { id: 'comment-1', author: 'Alice', text: 'Should we add social logins?', timestamp: '2023-10-27T10:00:00Z' }
        ]
      },
    ],
  }],
  ['done', {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 'task-4', title: 'Project setup and initialization', description: 'Initialize the React project with TypeScript and Tailwind CSS.', comments: [] },
    ],
  }],
]);


export const initialBoardData: BoardData = {
  id: 'board-1',
  name: 'Phoenix Project',
  columns: initialColumns,
};
