import type { Static } from '@sinclair/typebox';
import type { Task } from './todoList.schemas';

export const MOCK_TASKS: Static<typeof Task>[] = [
  {
    id: 0,
    createdAt: new Date('06/01/2023'),
    updatedAt: new Date('05/19/2024'),
    status: 'in-progress',
    title: 'Build TypeAPI',
  },
  {
    id: 1,
    createdAt: new Date('01/01/2024'),
    updatedAt: new Date('01/03/2024'),
    status: 'done',
    description: "Let's try to get typeapi.dev before someone takes it",
    title: 'Buy Domain for TypeAPI',
  },
  {
    id: 2,
    createdAt: new Date('05/19/2024'),
    updatedAt: new Date('05/19/2024'),
    description: 'Make sure to buy a light roast and check the roasted on date',
    status: 'todo',
    title: 'Buy Coffee',
  },
];
