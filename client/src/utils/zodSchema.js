import { z } from "zod";

export const signUpZodSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, { error: "Name should be at least 3 characters long" })
        .max(25, { error: "Name must be at most 25 characters" })
        .regex(/^[a-zA-Z\s]+$/, { error: "Name can only contain letters and spaces" }),
    email: z
        .email({ error: "Please provide a valid email address" }),
    password: z
        .string()
        .min(6, { error: "Password should be at least 6 characters long" })
        .max(64, { error: "Password must be at most 64 characters" })
});

export const loginZodSchema = z.object({
    email: z
        .email({ erorr: "Please provide a valid email address" }),
    password: z
        .string()
        .min(6, { error: "Password should be at least 6 characters long" })
        .max(64, { error: "Password must be at most 64 characters" })
});
