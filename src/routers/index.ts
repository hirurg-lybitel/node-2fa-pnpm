import express from 'express';
import { authController, restrictedPageController, signUp2faController, signUpController } from '../controllers';
import { expressjwt } from 'express-jwt';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY ?? '';

const jwtMiddleware = expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    getToken: (req) => {
      return req.session.token;
    },
    onExpired: (req, err) => {
        console.log('onExpired', err)
    },
  });

const router = express.Router();

router.get('/', (req, res) => res.render('signup.ejs'));

router.get('/logout', jwtMiddleware, authController.logout);
router.get('/restricted-page', jwtMiddleware, restrictedPageController.get);

router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);

router.get('/sign-up-2fa', signUp2faController.get);
router.post('/sign-up-2fa', signUp2faController.post);

router.post('/sign-up', signUpController.post);

export const appRouter = router;