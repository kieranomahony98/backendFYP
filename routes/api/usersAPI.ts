import express, { Request, Response } from 'express';
import { logger } from '../../helpers/logger';
import bcrypt from 'bcryptjs';
import { auth } from '../../middleware/auth';
import UserSchema from '../../MongoModels/userModel';
import config from 'config';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/user', auth, (req: Request, res: Response) => {
    const { id } = req.body.user;
    logger.info(`user info decoded ${id}`);
    UserSchema.findById(id).select('-password')
        .then((user) => {
            logger.info(`user found: ${user}`);
            res.json(user);
        }).catch((err) => {
            logger.error(`Failed to validate user: ${err.message}`);
            return res.status(500).send("failed to validate users");
        });
});



/** @Route Post /api/users/update
 *  @Desc provides api for user to update their profile
*/
// router.post('/update', (req, res) => {
//     // eslint-disable-next-line max-len
//     updateUser(req.body.email, req.body.password)
//         .then((bool) => {
//             if (bool) {
//                 res.send("User successfully updated");
//             }
//         })

// });

/** @Route Post /api/users/delete
 *  @Desc provides api for user to delete their profile
*/
// router.post('/delete', (req, res) => {
//     deleteUser(req.body.email)
//         .then((bool) => {
//             if (bool) {
//                 res.send("User successfully deleted")
//             }
//         })
// });


export default router;
