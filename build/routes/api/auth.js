"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../MongoModels/userModel"));
const logger_1 = require("../../helpers/logger");
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
//@route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    return userModel_1.default.findOne({ email })
        .then((user) => {
        if (!user) {
            return res.status(400).send('This email does not exist');
        }
        //validate hashed password 
        bcryptjs_1.default.compare(password, user.password)
            .then((isMatch) => {
            if (!isMatch) {
                return res.status(401).send('Invalid Credentails');
            }
            jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.get('jwtSecret'), { expiresIn: 3600 * 6 }, (err, token) => {
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
        logger_1.logger.error(err);
        throw err;
    });
});
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send("Please enter all fields");
    }
    const user = userModel_1.default.findOne({ email })
        .then((user) => user);
    if (user) {
        return res.status(409).send('This email is already registered');
    }
    const newUser = new userModel_1.default({
        name,
        email,
        password
    });
    bcryptjs_1.default.genSalt(10, async (err, salt) => {
        if (err) {
            throw err;
        }
        bcryptjs_1.default.hash(password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save()
                .then((user) => {
                jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.get('jwtSecret'), { expiresIn: 3600 * 6 }, (err, token) => {
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
                logger_1.logger.error(`failed to save user${err.message}`);
                throw err;
            });
        });
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map