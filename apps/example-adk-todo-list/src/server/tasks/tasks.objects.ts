import { builder, buildPaginatedObj } from 'server/generated/pothos';
import type { Task as TaskType } from 'server/generated/prisma';

export const Task = builder.prismaObject('Task', {
  description: 'A single task',
  fields: (t) => ({
    id: t.exposeString('id'),
    complete: t.exposeBoolean('complete'),
    name: t.exposeString('name'),
  }),
  name: 'Task',
});

export const PaginatedTask = buildPaginatedObj<TaskType>(Task, 'A paginated list of tasks');

export const TaskCreateInput = builder.prismaCreate('Task', {
  fields: (t) => ({
    name: t.string({ required: true }),
  }),
});

export const TaskUpdateInput = builder.prismaUpdate('Task', {
  fields: (t) => ({
    done: t.boolean({ required: false }),
    name: t.string({ required: false }),
  }),
});
