import UserSchema from '../../MongoModels/userModel';
import { logger } from '../../helpers/logger';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { auth } from '../../middleware/auth';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
//https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9&t=1795s&ab_channel=TraversyMedia 
//this video helped me in setting up the /login and /register routes
//@route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const jwtSecret = process.env.jwtSecret ? process.env.jwtSecret : '';
    return UserSchema.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(403).send('This email is not registered');
            }

            //validate hashed password 
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send('Invalid Credentails');
                    }
                    jwt.sign(
                        { id: user._id },
                        jwtSecret,
                        { expiresIn: 3600 * 6 },
                        (err, token) => {
                            if (err) {
                                throw err;
                            }
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    userName: user.userName,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        });
                });
        }).catch((err) => {
            logger.error(`failed to log in user: ${err.message}`);
            throw err;
        });
});

router.post('/register', (req, res) => {
    const { name, email, password, userName } = req.body;
    if (!name || !email || !password || !userName) {
        return res.status(400).send("Please enter all fields");
    }
    const jwtSecret = process.env.jwtSecret ? process.env.jwtSecret : '';

    const user = UserSchema.findOne({ email })
        .then((user) => {
            if (user) {
                return res.status(409).send('This email is already registered');
            }
            const newUser = new UserSchema({
                name,
                email,
                userName,
                password
            });
            bcrypt.genSalt(10, async (err, salt) => {
                if (err) {
                    throw err;
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => {
                            jwt.sign(
                                { id: user._id },
                                jwtSecret,
                                { expiresIn: 3600 * 6 },
                                (err, token) => {
                                    if (err) {
                                        throw err;
                                    }
                                    res.json({
                                        token,
                                        user: {
                                            id: user._id,
                                            userName: user.userName,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                });
                        }).catch((err) => {
                            logger.error(`failed to save user${err.message}`);
                            throw err;
                        });
                });
            });
        }).catch((err) => {
            logger.error(`Failed to register user: ${err.message}`);
            return res.status(500).send('Sorry, that didnt go through :(');
        });

});


export default router;
