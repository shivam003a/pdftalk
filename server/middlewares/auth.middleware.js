import { verifyJWT } from "../utils/jwtGenerator.js";

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.error("Unauthorized: Token missing", null, 401)
        }

        const decoded = verifyJWT(token);
        if (!decoded) {
            return res.error("Unauthorized: Invalid token", null, 401)
        }

        req.user = decoded;
        next()

    } catch (e) {
        console.error("checkAuth error:", e);
        return res.error(e?.message || "internal Server Error", null, 500)
    }
}