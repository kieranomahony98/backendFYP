import jwt, { decode } from 'jsonwebtoken';
import { logger } from '../helpers/logger';
import dotenv from 'dotenv';
dotenv.config();
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function auth(req: any, res: any, next: any) {
    try {
        logger.info('Verifying user authentication');
        const jwtSecret = process.env.jwtSecret ? process.env.jwtSecret : '';

        const token = req.headers['x-auth-token'];
        if (!token) {
            return res.status(401).send('no token, authorization denied');
        }
        const decoded = jwt.verify(token, jwtSecret);
        logger.info(`User token valid ${decoded}`);
        //add user from payload
        req.body.user = decoded;
        console.log(decoded);
        next();
    } catch (err) {
        logger.error(`Failed to decode user: ${err.message}`);
        next();
    }
}
export function movieAuth(req: any, res: any, next: any) {
    try {
        const jwtSecret = process.env.jwtSecret ? process.env.jwtSecret : '';

        logger.info('Verifying user authentication');
        if (req.body['x-auth-token']) {
            const token = req.body['x-auth-token'];
            const decoded = jwt.verify(token, jwtSecret);
            req.body.user = decoded;
            logger.info(`User token valid ${decoded}`);
        }

        next();
    } catch (err) {
        logger.error(`movie Auth: ${err}`);
        next();
    }
}

export function getAuth(req: any, res: any, next: any) {
    try {
        const jwtSecret = process.env.jwtSecret ? process.env.jwtSecret : '';
        const token = (req.headers['x-auth-token']) ? req.headers['x-auth-token'] : null;
        if (token) {
            req.token = jwt.verify(token, jwtSecret);
        }
        next();
    } catch (err) {
        logger.error(`Failed to get auth ${err.message}`);
        next();
    }
}