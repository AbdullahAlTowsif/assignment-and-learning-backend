import { Request, Response } from "express";
import { AssignmentService } from "./assignment.service";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status-codes";

const createAssignment = async (req: Request, res: Response) => {
  const instructorId = req.user?.id; // from auth middleware
  console.log("instructorId", instructorId);

  const result = await AssignmentService.createAssignment(
    req.body,
    instructorId
  );

  res.status(201).json({
    success: true,
    message: "Assignment created successfully",
    data: result,
  });
};

const getAllAssignments = async (_req: Request, res: Response) => {
  const result = await AssignmentService.getAllAssignments();

  res.status(200).json({
    success: true,
    message: "Assignments fetched successfully",
    data: result,
  });
};

const getSingleAssignment = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if(!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Id Not Found")
  }

  const result = await AssignmentService.getSingleAssignment(id);

  res.status(200).json({
    success: true,
    message: "Assignment fetched successfully",
    data: result,
  });
};

const updateAssignment = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const instructorId = req.user?.id;

  if(!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Id Not Found")
  }

  const result = await AssignmentService.updateAssignment(
    id,
    req.body,
    instructorId
  );

  res.status(200).json({
    success: true,
    message: "Assignment updated successfully",
    data: result,
  });
};

const deleteAssignment = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const instructorId = req.user?.id;

  const result = await AssignmentService.deleteAssignment(
    id,
    instructorId
  );

  res.status(200).json({
    success: true,
    message: "Assignment deleted successfully",
    data: result,
  });
};

export const AssignmentController = {
  createAssignment,
  getAllAssignments,
  getSingleAssignment,
  updateAssignment,
  deleteAssignment,
};