import express from "express";
import { AnalyticsController } from "./analytics.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../../prisma/generated/prisma/enums";

const router = express.Router();

// Instructor only

router.get(
    "/status-count",
    auth(Role.INSTRUCTOR),
    AnalyticsController.getSubmissionStatusCount
);

router.get(
    "/acceptance-rate",
    auth(Role.INSTRUCTOR),
    AnalyticsController.getAcceptanceRate
);

router.get(
    "/submissions-per-assignment",
    auth(Role.INSTRUCTOR),
    AnalyticsController.getSubmissionsPerAssignment
);

router.get(
    "/difficulty-performance",
    auth(Role.INSTRUCTOR),
    AnalyticsController.getDifficultyVsPerformance
);

export const AnalyticsRoutes = router;
