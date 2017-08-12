import { signIn, signUp } from './helpers';

export const userCtrl = {
    signUp: async (req, res, next) => {
        try {
            const { body } = req;
            const newUser = await signUp(body);
            res.json(newUser);
        } catch (e) {
            return next(e);
        }
    },
    signIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await signIn(email, password);
            res.json(user);
        } catch (e) {
            return next(e);
        }
    },
}