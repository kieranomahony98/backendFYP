import { logger } from '../../helpers/logger';
import UserSchema from '../../MongoModels/userModel';


export async function updateUser(email: string, password: string) {
    return UserSchema.updateOne(
        { email },
        { $set: { password: password } }
    )
        .then((user) => {
            return true;
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
}

export async function deleteUser(email: string) {
    return UserSchema.deleteOne({ email })
        .then((r) => {
            // eslint-disable-next-line max-len
            return true
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
}

