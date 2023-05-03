import { addPermissions, removePermissions } from 'server/generated/auth0Fga';
import { prisma } from 'server/generated/db';
import { Prisma } from 'server/generated/prisma';
import { PaginationParams } from 'server/generated/pothos';

export const createTask = async (data: Prisma.TaskCreateInput, userId: string) => {
  const task = await prisma.task.create({ data: { ...data, user: { connect: { id: userId } } } });
  await addPermissions({
    objectId: task.id,
    objectType: 'task',
    relation: 'owner',
    userId,
  });
  return task;
};

export const deleteTaskById = async (id: string) => {
  const task = await prisma.task.delete({ where: { id } });
  await removePermissions({
    objectId: id,
    objectType: 'task',
    relation: 'owner',
    userId: task.userId,
  });
  return task;
};

// TODO: We should write utilities around pagination to make it a little less boilerplate
export const getAllTasks = async (
  userId: string,
  pagination: PaginationParams | null | undefined = {}
) => {
  const [count, objects] = await prisma.$transaction([
    prisma.task.count(),
    prisma.task.findMany({
      cursor: pagination?.cursor
        ? {
            id: pagination.cursor,
          }
        : undefined,
      skip: pagination?.cursor ? 1 : undefined,
      take: pagination?.take ?? 10,
      where: { userId },
    }),
  ]);
  return {
    count,
    objects,
    next: objects[(pagination?.take ?? 10) - 1]?.id,
  };
};

export const getTaskById = async (id: string) => prisma.task.findUniqueOrThrow({ where: { id } });

export const updateTaskById = async (id: string, data: Prisma.TaskUpdateInput) =>
  prisma.task.update({ data, where: { id } });
