// importing dependencies
import express from 'express'
import dotenv from 'dotenv'
import { responseMiddleware } from './middlewares/response.middleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.config.js'
import authRoutes from './routes/auth.route.js'
import uploadRoutes from './routes/upload.route.js'
import queryRoutes from './routes/query.route.js'
import chatRoutes from './routes/chat.route.js'
import { uploadLimiter, queryDailyLimiter } from './middlewares/rateLimit.middleware.js'

// initialization
const app = express()
dotenv.config()

// constanst/variables
const PORT = process.env.PORT || 5000

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(responseMiddleware)
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URI,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))
app.use(morgan('combined'))

// routes
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadLimiter, uploadRoutes)
app.use('/api/query', queryDailyLimiter, queryRoutes)
app.use('/api/chat', chatRoutes)

// listening to request
app.listen(PORT, function () {
    connectDB();
    console.log(`Server is running at PORT: ${PORT}`)
})