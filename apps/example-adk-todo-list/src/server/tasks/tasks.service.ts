import { prisma } from 'server/generated/db';
import { Prisma } from 'server/generated/prisma';
import { PaginationParams } from 'server/generated/pothos';

export const createTask = async (data: Prisma.TaskCreateInput) => prisma.task.create({ data });

export const deleteTaskById = async (id: string) => prisma.task.delete({ where: { id } });

export const getAllTasks = async (pagination: PaginationParams | null | undefined = {}) => {
  const [count, objects] = await prisma.$transaction([
    prisma.task.count(),
    prisma.task.findMany({ ...pagination }),
  ]);
  return {
    count,
    objects,
  };
};

export const getTaskById = async (id: string) => prisma.task.findUniqueOrThrow({ where: { id } });

export const updateTaskById = async (id: string, data: Prisma.TaskUpdateInput) =>
  prisma.task.update({ data, where: { id } });
