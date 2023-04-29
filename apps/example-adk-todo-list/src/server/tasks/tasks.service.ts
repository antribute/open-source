import { prisma } from 'server/generated/db';
import { Prisma } from 'server/generated/prisma';
import { PaginationParams } from 'server/generated/pothos';

export const createTask = async (data: Prisma.TaskCreateInput, userId: string) =>
  prisma.task.create({ data: { ...data, user: { connect: { id: userId } } } });

export const deleteTaskById = async (id: string) => prisma.task.delete({ where: { id } });

export const getAllTasks = async (
  userId: string,
  pagination: PaginationParams | null | undefined = {}
) => {
  const [count, objects] = await prisma.$transaction([
    prisma.task.count(),
    prisma.task.findMany({ ...pagination, where: { userId } }),
  ]);
  return {
    count,
    objects,
  };
};

export const getTaskById = async (id: string) => prisma.task.findUniqueOrThrow({ where: { id } });

export const updateTaskById = async (id: string, data: Prisma.TaskUpdateInput) =>
  prisma.task.update({ data, where: { id } });
