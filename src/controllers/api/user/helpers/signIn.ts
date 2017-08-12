import { User } from '../../../../models';

export async function signIn(email: string, password: string) {
    const user: any = await User.findOne({ email: email });
    if (!user) {
        throw new Error('User not found.');
    }
    if (user.checkPassword(password)) {
        return user.createToken().toJSON()
    } else {
        throw new Error('Login failed.');
    }
}