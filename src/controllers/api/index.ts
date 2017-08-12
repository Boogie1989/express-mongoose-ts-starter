import { userRouter } from './user';
export function initApiRoutes(app) {
    app.use('/api', userRouter);
}