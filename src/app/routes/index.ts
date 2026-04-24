import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AssignmentRoutes } from '../modules/assignment/assignment.routes';
import { SubmissionRoutes } from '../modules/submission/submission.routes';
import { AnalyticsRoutes } from '../modules/analytics/analytics.routes';
import { SmartRoutes } from '../modules/smart/smart.routes';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/assignment',
        route: AssignmentRoutes
    },
    {
        path: '/submission',
        route: SubmissionRoutes
    },
    {
        path: '/analytics',
        route: AnalyticsRoutes
    },
    {
        path: '/ai',
        route: SmartRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;
