import express from 'express';
import * as UserController from "../controllers/userControllers";

const router = express.Router();

// Get all users (for development, this does not make sense in production)
router.get('/', UserController.getUsers);

router.post('/signup', UserController.registerUser);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

// router.post('/unregister', UserController.unregister);

export default router;
