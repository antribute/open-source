import { Type } from '@sinclair/typebox';

export const TodoItem = Type.Object({
  id: Type.Number(),
  isDone: Type.Boolean(),
  title: Type.String(),
});

export const TodoItemList = Type.Array(TodoItem);
