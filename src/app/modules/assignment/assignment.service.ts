import { prisma } from "../../utils/prisma";
import { TCreateAssignment, TUpdateAssignment } from "./assignment.interface";

const createAssignment = async (
  payload: TCreateAssignment,
  instructorId: string
) => {
  const { deadline, ...rest } = payload;

  const result = await prisma.assignment.create({
    data: {
      ...rest,
      deadline: new Date(deadline), // 🔥 convert string → Date
      instructorId,
    },
  });

  return result;
};

const getAllAssignments = async () => {
  return await prisma.assignment.findMany({
    include: {
      instructor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSingleAssignment = async (id: string) => {
  const result = await prisma.assignment.findUnique({
    where: { id },
    include: {
      instructor: true,
      submissions: true,
    },
  });

  if (!result) {
    throw new Error("Assignment not found");
  }

  return result;
};

const updateAssignment = async (
  id: string,
  payload: TUpdateAssignment,
  instructorId: string
) => {
  const assignment = await prisma.assignment.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  // 🔐 ownership check
  if (assignment.instructorId !== instructorId) {
    throw new Error("Unauthorized");
  }

  const updateData: any = { ...payload };

  // 🔥 handle deadline separately
  if (payload.deadline) {
    updateData.deadline = new Date(payload.deadline);
  }

  const result = await prisma.assignment.update({
    where: { id },
    data: updateData,
  });

  return result;
};

const deleteAssignment = async (id: string, instructorId: string) => {
  const assignment = await prisma.assignment.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  if (assignment.instructorId !== instructorId) {
    throw new Error("Unauthorized");
  }

  return await prisma.assignment.delete({
    where: { id },
  });
};

export const AssignmentService = {
  createAssignment,
  getAllAssignments,
  getSingleAssignment,
  updateAssignment,
  deleteAssignment,
};
