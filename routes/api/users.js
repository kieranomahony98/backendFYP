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

router.post('/update', (req, res) => {
    // eslint-disable-next-line max-len
    UserSchema.updateOne({email: req.body.email}, {$set: {password: req.body.password}})
        .then((user) => {
            res.send(`User updated: ${user}`);
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
});

router.get('/delete/:id', (req, res) => {
    UserSchema.deleteOne({email: req.params.id})
        .then((r) => {
            // eslint-disable-next-line max-len
            res.send(`${req.params.id} successfully deleted: ${JSON.stringify(r)}`);
        }).catch((err) => {
            logger.error(err);
            throw new Error();
        });
});


export default router;
