import express from 'express';
import UserSchema from '../../MongoModels/userModel';
import {logger} from '../../helpers/logger';

// eslint-disable-next-line new-cap
const router = express.Router();

/** @Route Post /api/users/register
 *  @Desc provides api to register user
*/
router.post('/register', (req, res)=> {
    const newUser = new UserSchema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    newUser.save()
        .then((user) => {
            res.send(user);
        }).catch((err) => {
            logger.error(err);
        });
});

/** @Route Post /api/users/login
 *  @Desc provides api for user to login
*/
router.post('/login', (req, res) => {
    const {email, password} = req.body;

    UserSchema.findOne({email: email})
        .then((user) => {
            if (!user) {
                return res.send('no email found');
            }
            if (password === user.password) {
                res.send(JSON.stringify(user));
            }
        });
});

/** @Route Post /api/users/update
 *  @Desc provides api for user to update their profile
*/
router.post('/update', (req, res) => {
    // eslint-disable-next-line max-len
    UserSchema.updateOne({email: req.body.email}, {$set: {password: req.body.password}})
        .then((user) => {
            res.send(`User Updated: ${req.body.email}`);
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
});

/** @Route Post /api/users/delete
 *  @Desc provides api for user to delete their profile
*/
router.post('/delete', (req, res) => {
    UserSchema.deleteOne({email: req.body.email})
        .then((r) => {
            // eslint-disable-next-line max-len
            res.send(`${req.params.id} successfully deleted: ${JSON.stringify(r)}`);
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
});


export default router;
