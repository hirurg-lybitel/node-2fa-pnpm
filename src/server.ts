import express, { NextFunction, Request } from 'express';
import session from 'express-session';
import NodeCache from 'node-cache';;
import bodyParser from 'body-parser';
import { appRouter } from './routers';
import * as dotenv from 'dotenv';
dotenv.config();
declare module 'express-session' {
  interface SessionData {
    qr: string;
    nickname: string;
    email: string;
    token: string;
  }
}

export const caching = new NodeCache({ useClones: false });

const secretKey = process.env.SECRET_KEY ?? '';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(session({
  secret: secretKey,
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }))


if (process.env.NODE_ENV === 'development') {
  app.use(appRouter);
} else {
  app.use('/.netlify/functions/server', appRouter);  
};


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

app.use((err: any, req: any, res: any, next: NextFunction) =>  {
  if(err.name === 'UnauthorizedError') {
    res.status(err.status).send(err.message);
    console.error(err);
    return;
  }
  next();
});


