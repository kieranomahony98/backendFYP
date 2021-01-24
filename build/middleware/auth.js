"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieAuth = exports.auth = void 0;
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../helpers/logger");
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function auth(req, res, next) {
    try {
        logger_1.logger.info('Verifying user authentication');
        const token = req.body.headers['x-auth-token'];
        if (!token) {
            return res.status(401).send('no token, authorization denied');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
        logger_1.logger.info(`User token valid ${decoded}`);
        //add user from payload
        req.body.user = decoded;
        next();
    }
    catch (err) {
        logger_1.logger.error(err);
        res.status(400).json({ msg: 'Token is not valid' });
    }
}
exports.auth = auth;
function movieAuth(req, res, next) {
    try {
        logger_1.logger.info('Verifying user authentication');
        if (req.body['x-auth-token']) {
            const token = req.body['x-auth-token'];
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
            req.body.user = decoded;
            logger_1.logger.info(`User token valid ${decoded}`);
        }
        next();
    }
    catch (err) {
        logger_1.logger.error(`movie Auth: ${err}`);
        res.status(400).json({ msg: 'Token is not valid' });
    }
}
exports.movieAuth = movieAuth;
//# sourceMappingURL=auth.js.map