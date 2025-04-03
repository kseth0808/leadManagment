import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

export const sessionConfig = (app) => {
    app.use(
        session({
            secret: "c8f9b3e4d9a6e75a9d4c9d76e8fef33d25baf7ce8d3423a9f9d44b2e7d73c9af",
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            },
        })
    );
};
