import express from 'express'
const router = express.Router()
import { checkAuth } from '../middlewares/auth.middleware.js'

import { checkAuthVerification, login, logout, signup } from '../controllers/auth.controller.js'
import { loginLimiter, registerLimiter } from '../middlewares/rateLimit.middleware.js'

router.post('/signup', registerLimiter, signup)
router.post('/login', loginLimiter, login)
router.post('/logout', logout)
router.get('/check-auth', checkAuth, checkAuthVerification)

export default router;