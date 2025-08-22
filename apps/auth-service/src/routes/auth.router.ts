import express, { Router } from 'express';
import { registerUser, verifyUser } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyUser);

export default router;
