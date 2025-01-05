import { Router } from "express";
import * as userController from '../controllers/userController.js'
import * as authMiddleware from '../middlewares/auth.js'
import {body} from 'express-validator'

const router = Router();


router.post('/register',
body('email').isEmail().withMessage('Email must be a valid email address'),
body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
userController.createUserController);

router.post('/login',
body('email').isEmail().withMessage('Email must be a valid email address'),
body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
userController.loginController
)

router.get('/logout',authMiddleware.authUser,userController.logoutController)
router.get('/profile',authMiddleware.authUser,userController.profileController);
router.get('/all',authMiddleware.authUser,userController.getAllUsersController);

export default router;
