import express, { Request, Response } from 'express';
import { logger } from '../../helpers/logger';
import bcrypt from 'bcryptjs';
import { auth } from '../../middleware/auth';
import UserSchema from '../../MongoModels/userModel';
import config from 'config';
import jwt from 'jsonwebtoken';


// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    return UserSchema.findOne({ email })
        .then((user) => {
            if (!user) {
                return null;
            }
            //validate hashed password 
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return 'Invalid Credentails';
                    }
                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 * 6 },
                        (err, token) => {
                            if (err) {
                                logger.error(`Failed to sign jwt: ${err.message}`)
                                throw err;
                            }
                            res.json({
                                token,
                                user: {
                                    id: user._id,
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

router.post('/user', auth, (req: Request, res: Response) => {
    const { id } = req.body.user;
    logger.info(`user info decoded ${id}`);
    UserSchema.findById(id).select('-password')
        .then((user) => {
            logger.info(`user found: ${user}`);
            res.json(user);
        }).catch(err => {
            logger.error(`Failed to validate user: ${err.message}`);
            throw err;
        })
});


router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send("Please enter all fields");
    }
    UserSchema.findOne({ email })
        .then((user) => {
            if (user) {
                res.json({ msg: 'this user already exists' });
            }
        }).catch((err) => {
            logger.error(`Failed to get user: ${err.message}`);
            return res.status(404).send('Error in retrieving user');
        });

    const newUser = new UserSchema({
        name,
        email,
        password
    });
    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                logger.error(`Failed to hash password: ${err.message}`)
                throw err;
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
                                logger.error(`failed to sign jwt: ${err.message}`);
                                throw err;
                            }
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        });
                }).catch((err) => {
                    logger.error(`failed to save new user: ${err.message}`);
                    throw err;
                });
        });
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
