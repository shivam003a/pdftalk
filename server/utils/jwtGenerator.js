import jwt from 'jsonwebtoken'

/**
 * Signs a JSON Web Token (JWT) using a payload and secret key.
 *
 * @param {object} payload - The payload to encode in the JWT (e.g., user ID, email).
 * @returns {string} The signed JWT token.
 */
export const signJWT = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: '7d',
        });

        return token;
    } catch (err) {
        throw new Error('Failed to sign token');
    }
};

/**
 * Verifies a JWT token using the secret key.
 *
 * @param {string} token - The JWT token to verify.
 * @returns {object|null} The decoded payload if valid, or null if invalid.
 */
export const verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
        return decoded;
    } catch (err) {
        return null;
    }
};