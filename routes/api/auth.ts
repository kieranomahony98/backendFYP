import UserSchema from '../../MongoModels/userModel';
import { logger } from '../../helpers/logger';
import express from 'express';
import bcrypt from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import { auth } from '../../middleware/auth';
const router = express.Router();

//@route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    return UserSchema.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(400).send('This email does not exist');
            }
            //validate hashed password 
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send('Invalid Credentails');
                    }
                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 * 6 },
                        (err, token) => {
                            if (err) {
                                throw err;
                            }
                            res.json({
                                token,
                                user: {
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        });
                });
        }).catch((err) => {
            logger.error(err);
            throw err;
        });
});

router.post('/register', (req, res) => {
    console.log('called');
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send("Please enter all fields");
    }
    UserSchema.findOne({ email })
        .then((user) => {
            if (user) {
                res.json({ msg: 'this user already exists' });
            }
        });

    const newUser = new UserSchema({
        name,
        email,
        password
    });
    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                throw new Error();
            }
            newUser.password = hash;
            newUser.save()
                .then((user) => {
                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 * 6 },
                        (err, token) => {
                            if (err) {
                                throw err;
                            }
                            res.json({
                                token,
                                user: {
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        });
                }).catch((err) => {
                    logger.error(err);
                });
        });
    });
});


export default router;
