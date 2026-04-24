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

const getSubmissionsByAssignment = async (
    assignmentId: string,
    instructorId: string
) => {
    // 🔍 ensure assignment belongs to instructor
    const assignment = await prisma.assignment.findUnique({
        where: { id: assignmentId },
    });

    if (!assignment) {
        throw new Error("Assignment not found");
    }

    if (assignment.instructorId !== instructorId) {
        throw new Error("Unauthorized");
    }

    const result = await prisma.submission.findMany({
        where: { assignmentId },
        include: {
            student: {
                select: {
                    id: true,
                    name: true,
                    email: true,
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

const reviewSubmission = async (
    submissionId: string,
    payload: { status: any; feedback: string },
    instructorId: string
) => {
    const submission = await prisma.submission.findUnique({
        where: { id: submissionId },
        include: {
            assignment: true,
            feedback: true,
        },
    });

    if (!submission) {
        throw new Error("Submission not found");
    }

    // 🔐 ensure instructor owns the assignment
    if (submission.assignment.instructorId !== instructorId) {
        throw new Error("Unauthorized");
    }

    // 🔄 update submission status
    await prisma.submission.update({
        where: { id: submissionId },
        data: {
            status: payload.status,
        },
    });

    let feedbackResult;

    // 🧠 if feedback already exists → update
    if (submission.feedback) {
        feedbackResult = await prisma.feedback.update({
            where: { submissionId: submissionId },
            data: {
                content: payload.feedback,
            },
        });
    } else {
        // ➕ create feedback
        feedbackResult = await prisma.feedback.create({
            data: {
                content: payload.feedback,
                submissionId: submissionId,
                instructorId,
            },
        });
    }

    return {
        message: "Submission reviewed successfully",
        feedback: feedbackResult,
    };
};

export const SubmissionService = {
    createSubmission,
    getMySubmissions,
    updateSubmission,
    getSubmissionsByAssignment,
    reviewSubmission,
};
