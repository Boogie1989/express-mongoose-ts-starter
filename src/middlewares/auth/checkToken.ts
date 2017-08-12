import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export function checckTokenMiddleware() {
    return async function (req, res, next) {
        try {
            const { query, headers } = req;
            let token;
            if (query && query.auth) {
                token = query.auth;
            } else if (headers && headers['authentication']) {
                token = headers['authentication'];
            }
            if (token) {
                const decoded = await decodeJwt(token, config.get('jwt.secret'));
                if (decoded) {
                    req['user'] = decoded;
                }
            } else {
                req['user'] = null;
            }
            return next();
        } catch (error) {
            req['user'] = null;
            return next();
        }
    }
}

function decodeJwt(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded);
        });
    });
}