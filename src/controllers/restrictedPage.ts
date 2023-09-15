import { RequestHandler } from "express";
import asyncWrap from "express-async-wrap";

const get: RequestHandler = asyncWrap(async (req, res) => {    
    // if (!('nickname' in req)) {
    //     res.status(422).send('Nickname is missed');
    //     return;
    // };
    return res.render('restricted.ejs', { email: req.session.nickname })
});

export const restrictedPageController = {
    get
};