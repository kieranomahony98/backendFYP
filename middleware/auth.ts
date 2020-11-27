import config from 'config';
import jwt from 'jsonwebtoken';
import { logger } from '../helpers/logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function auth(req: any, res: any, next: any) {
    try {
        const token = req.body.headers['x-auth-token'];
        // console.log(`${token} token`);
        // console.log(req.header);
        // console.log(res.headers.tokens);
        if (!token) {

            return res.status(401).send('no token, authorization denied');
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //add user from payload
        req.body.user = decoded;
        next();
    } catch (err) {
        logger.error(err);
        res.status(400).json({ msg: 'Token is not valid' });
    }
}