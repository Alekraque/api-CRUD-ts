import express from 'express';
import clientRoutes from './clientRoutes';
import userRoutes from './userRoutes';
import loginController from '@/controllers/loginController';

const router = express.Router();

router.use('/clients', clientRoutes);
router.use('/users', userRoutes);
router.use('/auth/login', loginController.login)

export default router
