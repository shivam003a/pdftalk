import rateLimit, { ipKeyGenerator } from 'express-rate-limit'

export const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 60 * 100,
    max: 500,
    message: {
        success: false,
        data: null,
        message: "Too many requests, try again later."
    },
    standardHeaders: true,
    legacyHeaders: false

})

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
    keyGenerator: (req) => {
        console.log(req?.user?._id)
        return req?.user?._id || ipKeyGenerator(req.ip)
    },
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
    max: 100,
    keyGenerator: (req) => {
        return req?.user?._id || ipKeyGenerator(req.ip)
    },
    message: {
        success: false,
        data: null,
        message: "Daily query limit reached"
    },
    standardHeaders: true,
    legacyHeaders: false
});
