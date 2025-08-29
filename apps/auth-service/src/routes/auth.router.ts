import express, { Router } from 'express';
import {
	loginUser,
	registerUser,
	userForgotPassword,
	verifyUser,
	verifyUserForgotPassword
} from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post('/login', loginUser);
router.post('/forgot-pass', userForgotPassword);
router.post('/verify-fortgot-pass', verifyUserForgotPassword);

export default router;
