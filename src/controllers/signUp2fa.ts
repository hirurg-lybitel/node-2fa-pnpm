import { RequestHandler } from "express";
import asyncWrap from "express-async-wrap";
import { verifyLogin } from "./helpers";

const get: RequestHandler = asyncWrap(async (req, res) => {
    const { qr, base32_secret: base32 } = req.session;
    if (!qr) {
        return res.redirect('/');
    };
    
    return res.render('signup-2fa.ejs', { qr, base32 })
});

const post: RequestHandler = asyncWrap(async (req, res) => {
    const { email } = req.session;

    if (!email) {
        console.log('[ error ] Email is empty');
        return res.redirect('/');
    };
    
    const code = req.body.code;
    
    return verifyLogin(email, code, req, res, '/sign-up-2fa');
});

export const signUp2faController = {
    get,
    post
}