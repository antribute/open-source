import { describe, expect, it } from 'bun:test';

import { todoListRouter } from './todoList.router';
import { todoListSdk } from './todoList.sdk';

const MOCK_TODO_ITEM = {
  id: 1,
  isDone: false,
  title: 'Mock Todo Item',
};

describe('TodoList SDK', () => {
  describe('getAllTodoItems', () => {
    it('should return an array of TodoItem', async () => {
      const data = await todoListSdk.funcs.getAllTodoItems();
      expect(data).toEqual([MOCK_TODO_ITEM]);
    });
  });
});
