import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequests';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post("/register", validateRequest(UserValidation.createUser), UserController.createUser);


export const UserRoutes = router;
