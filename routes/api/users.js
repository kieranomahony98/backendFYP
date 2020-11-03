import express from 'express';
import UserSchema from '../../models/User';
import {logger} from '../../helpers/logger';
// eslint-disable-next-line new-cap
const router = express.Router();

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

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userSchema.findOne({email})
        .then((user) => {
            if (!user) {
                return res.send('no email found');
            }
            if (password === user.password) {
                res.send(JSON.stringify(user));
            }
        });
});

export default router;
