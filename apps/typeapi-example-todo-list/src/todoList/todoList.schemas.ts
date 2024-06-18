import { Type } from '@sinclair/typebox';

export const TaskStatus = Type.Enum({
  todo: 'todo',
  inProgress: 'in-progress',
  done: 'done',
});

export const Task = Type.Object({
  id: Type.Number(),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
  description: Type.Optional(Type.String()),
  status: TaskStatus,
  title: Type.String(),
});

export const Tasks = Type.Array(Task);
