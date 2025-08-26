import express, { Router } from 'express';
import {
	loginUser,
	registerUser,
	verifyUser
} from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post('/login', loginUser);

export default router;
