import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUserProfile, login, logout, signup } from '../controllers/authController.js';
const router = express.Router();


router.get('/me', protectRoute, getUserProfile);
router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;