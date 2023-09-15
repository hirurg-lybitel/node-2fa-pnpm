import { RequestHandler } from "express";
import asyncWrap from "express-async-wrap";
import { verifyLogin } from "./helpers";

const get: RequestHandler = asyncWrap(async (req, res) => {
    const { qr } = req.session;
    if (!qr) {
        return res.redirect('/');
    };
    
    return res.render('signup-2fa.ejs', { qr })
});

const post: RequestHandler = asyncWrap(async (req, res) => {
    const { email } = req.session;

    if (!email) {
        return res.redirect('/')
    };
    
    const code = req.body.code;
    
    return verifyLogin(email, code, req, res, '/sign-up-2fa');
});

export const signUp2faController = {
    get,
    post
}