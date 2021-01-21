import { logger } from '../../helpers/logger';
import UserSchema from '../../MongoModels/userModel';


export async function updateUser(email: string, password: string): Promise<boolean> {
    return UserSchema.updateOne(
        { email },
        { $set: { password } })
        .then((user) => true)
        .catch((err) => {
            logger.error(`failed to update user: ${err.message}`);
            throw err;
        });
}

export async function deleteUser(email: string): Promise<boolean> {
    return UserSchema.deleteOne({ email })
        .then((r) => true)
        .catch((err) => {
            logger.error(`failed to delete user: ${err.message}`);
            throw err;
        });
}

