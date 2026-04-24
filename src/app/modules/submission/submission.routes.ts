import express from "express";
import { SubmissionController } from "./submission.controller";
import {
    createSubmissionValidation,
    updateSubmissionValidation,
} from "./submission.validation";
import auth from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequests";
import { Role } from "../../../../prisma/generated/prisma/enums";

const router = express.Router();

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

export const SubmissionRoutes = router;
