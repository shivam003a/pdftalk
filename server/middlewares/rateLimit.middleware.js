import rateLimit from 'express-rate-limit'

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        data: null,
        message: "Too many login attempts, try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const registerLimiter = rateLimit({
    windowMs: 1 * 60 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        data: null,
        message: "Too many registration attempts, try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const uploadLimiter = rateLimit({
    windowMs: 1 * 24 * 60 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        data: null,
        message: "Daily upload limit reached"
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const queryDailyLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 30,
    message: {
        success: false,
        data: null,
        message: "Daily query limit reached"
    },
    standardHeaders: true,
    legacyHeaders: false
});