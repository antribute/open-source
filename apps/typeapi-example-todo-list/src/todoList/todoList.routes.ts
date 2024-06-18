import { ResolverError, Route } from '@antribute/typeapi';
import { Type } from '@sinclair/typebox';
import { MOCK_TASKS } from './todoList.mocks';
import { Task, Tasks } from './todoList.schemas';

export const GetTaskById = new Route(
  '/tasks/:taskId',
  'get',
  ({ path }) => {
    const task = MOCK_TASKS.find(({ id }) => id === path.taskId);
    if (!task) {
      throw new ResolverError(404, `Task with ID ${path.taskId} Not Found`);
    }
    return { body: task };
  },
  {
    input: {
      path: {
        taskId: Type.Number(),
      },
    },
    output: { body: Task },
  }
);

export const GetTasks = new Route(
  '/tasks',
  'get',
  ({ query }) => {
    const tasks = MOCK_TASKS.filter((task) => {
      if (query.title) {
        return task.title.toLowerCase().includes(query.title.toLowerCase());
      }
      return task;
    });
    return {
      body: tasks,
    };
  },
  {
    input: {
      query: {
        title: Type.Optional(Type.String()),
      },
    },
    output: { body: Tasks },
  }
);
