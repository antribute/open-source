import { builder } from 'server/generated/pothos';
import { TaskCreateInput, TaskUpdateInput } from './tasks.objects';
import { createTask, deleteTaskById, updateTaskById } from './tasks.service';

builder.mutationField('createTask', (t) =>
  t.prismaField({
    args: {
      input: t.arg({ type: TaskCreateInput, required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (_query, _root, { input }, { userId }) =>
      createTask({ ...input, complete: false, user: { connect: { id: 'foo' } } }, userId),
    type: 'Task',
  })
);

builder.mutationField('deleteTask', (t) =>
  t.prismaField({
    args: {
      id: t.arg.string({ required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (_query, _root, { id }) => deleteTaskById(id),
    type: 'Task',
  })
);

builder.mutationField('updateTask', (t) =>
  t.prismaField({
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: TaskUpdateInput, required: true }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (_query, _root, { id, input }) => updateTaskById(id, input),
    type: 'Task',
  })
);
