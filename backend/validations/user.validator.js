import {z} from zod;

export const registerUserSchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: "Full name is required" }),
    userName: z.string({ required_error: "Username is required" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});
export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, "Password is required"),
  }),
});