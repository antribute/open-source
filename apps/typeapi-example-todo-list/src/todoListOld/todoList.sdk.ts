import { Func, Sdk } from '@antribute/typeapi';
import { Type } from '@sinclair/typebox';

import { TodoItemList } from './todoList.models';

const MOCK_TODO_ITEM = {
  id: 1,
  isDone: false,
  title: 'Mock Todo Item',
};

const getAllTodoItems = new Func(Type.Never(), TodoItemList, async () => [MOCK_TODO_ITEM]);

export const todoListSdk = new Sdk({ getAllTodoItems });
