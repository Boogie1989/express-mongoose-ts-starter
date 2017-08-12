import { mongooseErrorHandlerMiddleware } from './mongoose';

export function initErrorMiddlewares(app) {
    app.use(mongooseErrorHandlerMiddleware);
}