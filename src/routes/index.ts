import express from 'express'
import clientRoutes from './clientRoutes'
import userRoutes from './userRoutes'

import loginRoutes from './loginRoutes'

const router = express.Router()

router.use('/clients', clientRoutes)
router.use('/users', userRoutes)
router.use('/auth/login', loginRoutes)

export default router
