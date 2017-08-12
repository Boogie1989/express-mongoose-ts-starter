import * as mongoose from 'mongoose';
(<any>mongoose).Promise = Promise;

export function initDb(path: string) {
    mongoose.connect(path, <any>{ useMongoClient: true });
    return mongoose.connection;
}

export { User } from './User';
