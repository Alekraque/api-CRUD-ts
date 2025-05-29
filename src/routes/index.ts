import express from 'express';
import clientRoutes from './clientRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/clients', clientRoutes);
router.use('/users', userRoutes);

export default router
