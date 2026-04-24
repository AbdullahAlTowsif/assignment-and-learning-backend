import express from "express";
import { AssignmentController } from "./assignment.controller";
import { createAssignmentValidation, updateAssignmentValidation } from "./assignment.validation";
import auth from "../../middleware/auth";
import { Role } from "../../../../prisma/generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequests";


const router = express.Router();

// 🔐 Only instructor
router.post(
  "/create-assignment",
  auth(Role.INSTRUCTOR),
  validateRequest(createAssignmentValidation),
  AssignmentController.createAssignment
);

router.get("/", AssignmentController.getAllAssignments);

router.get("/:id", AssignmentController.getSingleAssignment);

router.patch(
  "/:id",
  auth("INSTRUCTOR"),
  validateRequest(updateAssignmentValidation),
  AssignmentController.updateAssignment
);

router.delete(
  "/:id",
  auth("INSTRUCTOR"),
  AssignmentController.deleteAssignment
);

export const AssignmentRoutes = router;
