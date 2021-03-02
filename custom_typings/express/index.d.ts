
declare namespace Express {
    export interface Request {
        token: {
            id: string,
            exp: string
        }
    }
}

