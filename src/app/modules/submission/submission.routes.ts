import express from "express";
import { SubmissionController } from "./submission.controller";
import {
    createSubmissionValidation,
    reviewSubmissionValidation,
    updateSubmissionValidation,
} from "./submission.validation";
import auth from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequests";
import { Role } from "../../../../prisma/generated/prisma/enums";

const router = express.Router();

// student routes

router.post(
    "/",
    auth(Role.STUDENT),
    validateRequest(createSubmissionValidation),
    SubmissionController.createSubmission
);

router.get(
    "/my-submissions",
    auth(Role.STUDENT),
    SubmissionController.getMySubmissions
);

router.patch(
    "/:id",
    auth("STUDENT"),
    validateRequest(updateSubmissionValidation),
    SubmissionController.updateSubmission
);

// Instructor Routes

router.get(
    "/assignment/:assignmentId",
    auth("INSTRUCTOR"),
    SubmissionController.getSubmissionsByAssignment
);

router.patch(
    "/review/:id",
    auth("INSTRUCTOR"),
    validateRequest(reviewSubmissionValidation),
    SubmissionController.reviewSubmission
);

export const SubmissionRoutes = router;
