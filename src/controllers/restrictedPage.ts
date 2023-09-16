import { RequestHandler } from "express";
import { Request as JWTRequest } from "express-jwt";
import asyncWrap from "express-async-wrap";

const get: RequestHandler = asyncWrap(async (req: JWTRequest, res) => {    
    return res.render('restricted.ejs', { nickname: req.auth?.nickname ?? 'guest' })
});

export const restrictedPageController = {
    get
};