import { Request, Response } from "express";
import { SubmissionService } from "./submission.service";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status-codes";

const createSubmission = async (req: Request, res: Response) => {
    const studentId = req.user?.id;

    const result = await SubmissionService.createSubmission(
        req.body,
        studentId
    );

    res.status(201).json({
        success: true,
        message: "Submission created successfully",
        data: result,
    });
};

const getMySubmissions = async (req: Request, res: Response) => {
    const studentId = req.user?.id;

    const result = await SubmissionService.getMySubmissions(studentId);

    res.status(200).json({
        success: true,
        message: "My submissions fetched successfully",
        data: result,
    });
};

const updateSubmission = async (req: Request, res: Response) => {
    // const { id } = req.params;
    const id = req.params.id as string;
    const studentId = req.user?.id;

    if(!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Student Id Not Found")
    }

    const result = await SubmissionService.updateSubmission(
        id,
        req.body,
        studentId
    );

    res.status(200).json({
        success: true,
        message: "Submission updated successfully",
        data: result,
    });
};

export const SubmissionController = {
    createSubmission,
    getMySubmissions,
    updateSubmission,
};
