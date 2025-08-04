import bcrypt from 'bcryptjs';

/**
 * Hashes a plain-text password using bcryptjs
 *
 * @param {string} password - The plain-text password to hash
 * @returns Promise - The hashed password
 */
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (err) {
        throw new Error('Failed to hash password');
    }
};

/**
 * Compares a plain-text password to a hashed password using bcryptjs
 * 
 * @param {string} password - The plain-text password
 * @param {string} hashedPassword - The previously hashed password
 * @returns Promise - Whether the passwords match
 */
export const comparePassword = async (password, hashedPassword) => {
    try {
        const doesPasswordMatch = await bcrypt.compare(password, hashedPassword);

        return doesPasswordMatch;
    } catch (err) {
        throw new Error('Password comparison failed');
    }
};
