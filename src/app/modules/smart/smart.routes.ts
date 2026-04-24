import express from "express";
import {
    generateFeedbackValidation,
    improveDescriptionValidation,
} from "./smart.validation";
import { SmartController } from "./smart.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../../prisma/generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequests";

const router = express.Router();

router.post(
    "/generate-feedback",
    auth(Role.INSTRUCTOR),
    validateRequest(generateFeedbackValidation),
    SmartController.generateFeedback
);

router.post(
    "/improve-description",
    auth(Role.INSTRUCTOR),
    validateRequest(improveDescriptionValidation),
    SmartController.improveDescription
);

export const SmartRoutes = router;
