import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";

const getSubmissionStatusCount = async (req: Request, res: Response) => {
    const instructorId = req.user?.id;

    const result = await AnalyticsService.getSubmissionStatusCount(
        instructorId
    );

    res.status(200).json({
        success: true,
        message: "Submission status count fetched",
        data: result,
    });
};

const getAcceptanceRate = async (req: Request, res: Response) => {
    const instructorId = req.user?.id;

    const result = await AnalyticsService.getAcceptanceRate(instructorId);

    res.status(200).json({
        success: true,
        message: "Acceptance rate fetched",
        data: result,
    });
};

const getSubmissionsPerAssignment = async (
    req: Request,
    res: Response
) => {
    const instructorId = req.user?.id;

    const result = await AnalyticsService.getSubmissionsPerAssignment(
        instructorId
    );

    res.status(200).json({
        success: true,
        message: "Submissions per assignment fetched",
        data: result,
    });
};

const getDifficultyVsPerformance = async (
    req: Request,
    res: Response
) => {
    const instructorId = req.user?.id;

    const result = await AnalyticsService.getDifficultyVsPerformance(
        instructorId
    );

    res.status(200).json({
        success: true,
        message: "Difficulty vs performance fetched",
        data: result,
    });
};

export const AnalyticsController = {
    getSubmissionStatusCount,
    getAcceptanceRate,
    getSubmissionsPerAssignment,
    getDifficultyVsPerformance,
};
