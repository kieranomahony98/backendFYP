import { logger } from '../../helpers/logger';
import UserSchema from '../../MongoModels/userModel';
import bcrypt from 'bcryptjs';

export async function updateUser(_id: string, userDetails: any): Promise<any> {
    if (userDetails.currentPassword) {
        return await UserSchema.findOne({ _id })
            .then(async (user) => {
                if (!user) {
                    throw new Error("This user does not exist");
                }

                const isMatch = await bcrypt.compare(userDetails.currentPassword, user.password)
                    .then((isMatch) => isMatch);
                if (!isMatch) {
                    throw new Error("Incorrect Password");
                }
                const salt = await bcrypt.genSalt(10)
                    .then((salt) => salt)
                    .catch((err) => {
                        logger.error(`failed to salt: ${err.message}`);
                        throw err;
                    });
                return await bcrypt.hash(userDetails.password, salt)
                    .then(async (hasedPassword) => {
                        userDetails.password = hasedPassword;
                        return await user?.update({ $set: { ...userDetails } }).lean()
                            .then((user) => user);

                    });
            }).catch((err) => {
                logger.error(`Failed to update user with password :${err.message}`);
                throw err;
            });
    }
    return UserSchema.findOneAndUpdate(
        { _id },
        { $set: { ...userDetails } }, { new: true }).lean().select("-password")
        .then((user) => user)
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

