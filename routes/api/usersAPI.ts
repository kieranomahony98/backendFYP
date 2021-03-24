import express, { Request, Response } from 'express';
import { logger } from '../../helpers/logger';
import { getAuth, auth } from '../../middleware/auth';
import UserSchema from '../../MongoModels/userModel';
import { updateUser } from '../../services/userServices/userDbService';

const router = express.Router();
//https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9&t=1795s&ab_channel=TraversyMedia
//the user route was created with help from the above link.
router.get('/user', getAuth, (req: Request, res: Response) => {
    console.log(req.token);
    const { id } = req.token;
    logger.info(`user info decoded ${id}`);
    UserSchema.findById(id).select('-password')
        .then((user) => {
            logger.info(`user found: ${user}`);
            if (user) {
                res.send({
                    user: {
                        id: user._id,
                        name: user.name,
                        userName: user.userName,
                        email: user.email
                    }
                });
            }
        }).catch((err) => {
            logger.error(`Failed to validate user: ${err.message}`);
            return res.status(500).json({ msg: "failed to validate users" });
        });
});




/** @Route Post /api/users/update
 *  @Desc provides api for user to update their profile
*/
router.post('/update', auth, (req, res) => {
    const { id } = req.body.user ? req.body.user : null;

    if (id !== req.body.userDetails._id) {
        return res.status(401).send('You do not have the privilages to update this user');
    }

    updateUser(id, req.body.userDetails)
        .then((user) => {
            if (user?.message) {
                return res.status(401).send(user.message);
            }
            if (user) {
                res.send(user);
            }
        }).catch((err) => {
            logger.error(`Failed to update user: ${err.message}`);
            res.status(err.status ? err.status : 500).send(err.message ? err.message : "failed to update user");
        });
});

export default router;
