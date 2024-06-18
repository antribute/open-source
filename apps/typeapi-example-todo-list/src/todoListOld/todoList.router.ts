import { Router } from '@antribute/typeapi';

import { todoListSdk } from './todoList.sdk';

export const todoListRouter = new Router(todoListSdk, {
  '/todos': {
    get: { funcName: 'getAllTodoItems' },
  },
});
