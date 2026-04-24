import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
    '/login',
    AuthController.loginUser
);

router.post(
    '/refresh-token',
    AuthController.refreshToken
)

router.post("/logout", AuthController.logout);

router.get(
    '/me',
    AuthController.getMe
)

export const AuthRoutes = router;
