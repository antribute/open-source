import { App } from '@antribute/typeapi';

import { GetTaskById, GetTasks } from './todoList.routes';

export const TodoListApp = new App({
  routes: {
    GetTaskById,
    GetTasks,
  },
});
