import { User } from '../../models';

export function auth(opt) {
    const { needUser = false } = opt;
    return async function authMidlware(req, res, next) {
        if (!req.user) {
            return res.status(401).json({
                message: 'Authorization Required'
            })
        } else if (needUser) {
            try {
                const user = await User.findById(req.user._id || req.user.id);
                if (user) {
                    req.user = user;
                } else {
                    return next(new Error('Incorect token.'));
                }
            } catch (error) {
                return next(error);
            }
        }
        return next();
    };
}
