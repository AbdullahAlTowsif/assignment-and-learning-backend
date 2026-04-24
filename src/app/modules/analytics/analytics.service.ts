import { prisma } from "../../utils/prisma";

// Submission Status Count

const getSubmissionStatusCount = async (instructorId: string) => {
    const result = await prisma.submission.groupBy({
        by: ["status"],
        _count: {
            status: true,
        },
        where: {
            assignment: {
                instructorId,
            },
        },
    });

    return result;
};

// Acceptance Rate

const getAcceptanceRate = async (instructorId: string) => {
  const total = await prisma.submission.count({
    where: {
      assignment: { instructorId },
    },
  });

  const accepted = await prisma.submission.count({
    where: {
      assignment: { instructorId },
      status: "ACCEPTED",
    },
  });

  const rate = total === 0 ? 0 : (accepted / total) * 100;

  return {
    total,
    accepted,
    acceptanceRate: Number(rate.toFixed(2)),
  };
};

// Submissions Per Assignment

const getSubmissionsPerAssignment = async (instructorId: string) => {
  const assignments = await prisma.assignment.findMany({
    where: { instructorId },
    include: {
      _count: {
        select: {
          submissions: true,
        },
      },
    },
  });

  return assignments.map((a) => ({
    assignmentId: a.id,
    title: a.title,
    submissionCount: a._count.submissions,
  }));
};

// Difficulty vs Performance

const getDifficultyVsPerformance = async (instructorId: string) => {
  const result = await prisma.assignment.findMany({
    where: { instructorId },
    include: {
      submissions: true,
    },
  });

  const data = result.map((assignment) => {
    const total = assignment.submissions.length;

    const accepted = assignment.submissions.filter(
      (s) => s.status === "ACCEPTED"
    ).length;

    const acceptanceRate =
      total === 0 ? 0 : Number(((accepted / total) * 100).toFixed(2));

    return {
      difficulty: assignment.difficulty,
      assignmentId: assignment.id,
      title: assignment.title,
      totalSubmissions: total,
      accepted,
      acceptanceRate,
    };
  });

  return data;
};

export const AnalyticsService = {
  getSubmissionStatusCount,
  getAcceptanceRate,
  getSubmissionsPerAssignment,
  getDifficultyVsPerformance,
};