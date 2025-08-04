import User from '../models/user.model.js'
import { getCookieOptions } from '../utils/cookieOption.js'
import { signJWT } from '../utils/jwtGenerator.js'
import { comparePassword, hashPassword } from '../utils/passwordHashing.js'

export const signup = async (req, res) => {
    const { name, email, password } = req.body

    try {
        // basic validation
        if (!name || !email || !password) {
            return res.error("All Fields are required", null, 400)
        }

        // check if user exists
        const userExist = await User.findOne({ email })

        // if user exists, return
        if (userExist) {
            return res.error("Email Already Registered", null, 409)
        }

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const userObj = user.toObject();
        delete userObj.password;

        // sign payload to create token
        const token = signJWT({
            name: user?.name,
            _id: user?._id,
            email: user?.email
        })
        res.cookie('token', token, getCookieOptions())

        return res.success("Email Registered", userObj, 201)

    } catch (e) {
        return res.error(e?.message || "Internal Server Error", null, 500)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // basic validation
        if (!email || !password) {
            return res.error("All Fields are required", null, 400)
        }

        // check if user exists
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.error("User Not Found", null, 404)
        }

        // verify the password
        const isPasswordMatched = await comparePassword(password, userExists?.password)
        if (!isPasswordMatched) {
            return res.error("Invalid Credentials", null, 422)
        }

        // generated token
        const token = signJWT({
            name: userExists?.name,
            _id: userExists?._id,
            email: userExists?.email
        })
        res.cookie('token', token, getCookieOptions())

        const userObj = userExists.toObject();
        delete userObj.password;

        return res.success("User Logged In", userObj, 200)
    } catch (e) {
        return res.error(e?.message || "Internal Server Error", null, 500)
    }
}

export const logout = async (req, res) => {
    try {
        const { httpOnly, secure, sameSite, path } = getCookieOptions()
        res.clearCookie('token', {
            httpOnly,
            secure,
            sameSite,
            path
        });

        return res.success("User Logged Out", null, 200)

    } catch (e) {
        return res.error(e?.message || "Internal Server Error", null, 500)
    }
}

export const checkAuthVerification = async (req, res) => {
    try {
        const { _id } = req.user;

        const userExists = await User.findById(_id).select('-password')
        if (!userExists) {
            return res.error("Not Authenticated", null, 401)
        }

        return res.success("User is Authenticated", req.user, 200)
    } catch (e) {
        console.error('/check-auth Error:', e)
        return res.error(e?.message || "Internal Server Error", null, 500)
    }
}