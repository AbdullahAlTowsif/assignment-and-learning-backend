import { prisma } from "../../utils/prisma";
import {
    TCreateSubmission,
    TUpdateSubmission,
} from "./submission.interface";

const createSubmission = async (
    payload: TCreateSubmission,
    studentId: string
) => {
    const { assignmentId, studentNote, studentUrl } = payload;

    // 🔍 check assignment exists
    const assignment = await prisma.assignment.findUnique({
        where: { id: assignmentId },
    });

    if (!assignment) {
        throw new Error("Assignment not found");
    }

    // ⛔ prevent duplicate submission (optional but strong)
    const existing = await prisma.submission.findFirst({
        where: {
            assignmentId,
            studentId,
        },
    });

    if (existing) {
        throw new Error("You have already submitted this assignment");
    }

    // ⛔ deadline check (optional but recommended)
    if (new Date() > assignment.deadline) {
        throw new Error("Submission deadline has passed");
    }

    const result = await prisma.submission.create({
        data: {
            studentId,
            assignmentId,
            studentNote,
            studentUrl,
        },
    });

    return result;
};

const getMySubmissions = async (studentId: string) => {
    const result = await prisma.submission.findMany({
        where: { studentId },
        include: {
            assignment: {
                select: {
                    title: true,
                    difficulty: true,
                    deadline: true,
                },
            },
            student: {
                select: {
                    name: true,
                    email: true
                },
            },
            feedback: true,
        },
        orderBy: {
            submittedAt: "desc",
        },
    });

    return result;
};

const updateSubmission = async (
    id: string,
    payload: TUpdateSubmission,
    studentId: string
) => {
    const submission = await prisma.submission.findUnique({
        where: { id },
        include: { assignment: true },
    });

    if (!submission) {
        throw new Error("Submission not found");
    }

    // 🔐 ownership check
    if (submission.studentId !== studentId) {
        throw new Error("Unauthorized");
    }

    // ⛔ prevent update after deadline
    if (new Date() > submission.assignment.deadline) {
        throw new Error("Cannot update after deadline");
    }

    const result = await prisma.submission.update({
        where: { id },
        data: payload,
    });

    return result;
};

export const SubmissionService = {
    createSubmission,
    getMySubmissions,
    updateSubmission,
};
