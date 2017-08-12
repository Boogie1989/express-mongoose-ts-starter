import { User } from '../../../../models';

export async function signUp(body) {
    return await User.create(body);
}