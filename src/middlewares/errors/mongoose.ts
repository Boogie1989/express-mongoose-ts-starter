export function mongooseErrorHandlerMiddleware(error, req, res, next) {
    let err: any = new Error();
    if (error.name === 'MongoError' && error.code === 11000) {
        err.status = 400;
        let message = error.errmsg || error.message;
        let field = message.split('index: ')[1];
        field = field.split('_')[0];
        err.message = `There was a duplicate key error.`;
        err.duplicateField = field;
    } else {
        err.message = error.message;
    }
    res.status(err.status || 400).json(err);
}