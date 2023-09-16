import { RequestHandler } from "express";
import asyncWrap from "express-async-wrap";
import { authenticator } from "otplib";
import QRCode from "qrcode";
import { caching } from "../server";

const post: RequestHandler = asyncWrap(async (req, res) => {
    const { email = '', nickname = '' } = req.body;
    const secret = authenticator.generateSecret();
    const issuer = 'My node 2fa example';

    if (!email) {
        console.log('[ error ] Email is empty');
        return res.redirect('/');
    };
    if (!nickname) {
        console.log('[ error ] Nickname is empty');
        return res.redirect('/');
    };    

    try {
        caching.set(email, { email, secret, nickname });

        QRCode.toDataURL(
            authenticator.keyuri(email, issuer, secret),
            (err, url) => {
                if (err) {
                    throw err;
                }
    
                req.session.qr = url;
                req.session.base32_secret = secret;
                req.session.email = email;
                req.session.nickname = nickname;
            
                res.redirect('/sign-up-2fa')
            });
    } catch (error) {
        console.error(error);
    }
});

export const signUpController = {
    post
};
