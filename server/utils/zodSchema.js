import { z } from 'zod'

export const signupSchema = z.object({
    name: z.
        string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must not exceed 50 characters" }),
    email: z
        .string()
        .email({ message: "Please provide a valid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password must not exceed 100 characters" })
})

export const signinSchema = z.object({
    email: z
        .string()
        .email({ message: "Please provide a valid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 8 characters long" })
        .max(100, { message: "Password must not exceed 100 characters" })
})

export const chatIdSchema = z.object({
    chatId: z
        .string()
        .regex(/^[a-f\d]{24}$/i, "Invalid chatId format")
});

export const queryPdfSchema = z.object({
    query: z.string().min(1, "Query cannot be empty"),
    chatId: z
        .string()
        .regex(/^[a-f\d]{24}$/i, "Invalid chatId format")
});

export const uploadPdfSchema = z.object({
    originalname: z.string().min(3).max(100),
    mimetype: z.string().regex(/^application\/pdf$/, "Only PDF files are allowed"),
    size: z.number().max(3 * 1024 * 1024, "File must be <= 3MB")
});