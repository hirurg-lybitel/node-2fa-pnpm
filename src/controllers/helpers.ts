import { Request, Response } from "express";
import { caching } from "../server";
import { IUserData } from "../types";
import { authenticator } from "otplib";
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY ?? '';

export const verifyLogin = (email: string, code: string, req: Request, res: Response, failUrl: string) => {
    try {
        const userData = caching.get<IUserData>(email);

        if (!userData) {
            return res.redirect('/');
        }

        const { secret } = userData;

        if (!authenticator.check(code, secret)) {
            console.error('[ error ] Unavailable code');
            return res.redirect(failUrl);
        }

        req.session.qr = '';
        req.session.email = '';
        req.session.token = jwt.sign(email, secretKey);

        return res.redirect('/restricted-page');
        
    } catch (error) {
        console.error(error);
        return res.redirect(failUrl);
    }
};