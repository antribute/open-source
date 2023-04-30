import { builder, PaginationInput } from 'server/generated/pothos';
import { PaginatedTask, Task } from './tasks.objects';
import { getAllTasks, getTaskById } from './tasks.service';

builder.queryField('task', (t) =>
  t.field({
    args: {
      id: t.arg.string({
        description: 'The UUID of the task to fetch',
        required: true,
      }),
    },
    authScopes: (_, args) => ({
      loggedIn: true,
      hasPermissions: {
        authModelId: '',
        objectId: args.id,
        relation: 'owner',
      },
    }),
    resolve: async (_query, args) => getTaskById(args.id),
    type: Task,
  })
);

builder.queryField('tasks', (t) =>
  t.field({
    args: {
      pagination: t.arg({ type: PaginationInput, required: false }),
    },
    authScopes: {
      loggedIn: true,
    },
    resolve: async (_query, args, { userId }) => getAllTasks(userId, args.pagination),
    type: PaginatedTask,
  })
);
