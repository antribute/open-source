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
    resolve: async (_query, args) => getTaskById(args.id),
    type: Task,
  })
);

builder.queryField('tasks', (t) =>
  t.field({
    args: {
      pagination: t.arg({ type: PaginationInput, required: false }),
    },
    resolve: async (_query, args) => getAllTasks(args.pagination),
    type: PaginatedTask,
  })
);
