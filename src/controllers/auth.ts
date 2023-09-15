import { RequestHandler } from "express";
import asyncWrap from "express-async-wrap";
import { verifyLogin } from "./helpers";

const loginGet: RequestHandler = asyncWrap(async (req, res) => {
    return res.render('login.ejs');
});

const loginPost: RequestHandler = asyncWrap(async (req, res) => {
    const { email, code } = req.body;

    if (!email) {
        res.status(422).send('Email is empty');
    }

    if (!code) {
        res.status(422).send('Code is empty');
    }

    return verifyLogin(email, code, req, res, '/login');
});

const logout: RequestHandler = asyncWrap(async (req, res) => {
    req.session.destroy((err) => {
        if (!err) return;

        console.error(err);
    });
    return res.redirect('/');
});


export const authController = {
    loginGet,
    loginPost,
    logout
};