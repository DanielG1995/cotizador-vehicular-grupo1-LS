
import { z } from "zod";
import { MESSAGES } from "../helpers/messages";

export const signUpSchema = z
    .object({
        name: z.string().min(2, MESSAGES.FORM_ERRORS.NAME_TOO_SHORT),
        email: z.string().email(MESSAGES.FORM_ERRORS.INVALID_EMAIL_FORMAT),
        password: z
            .string()
            .min(6, MESSAGES.FORM_ERRORS.PASSWORD_TOO_SHORT)
            .regex(/[A-Z]/, MESSAGES.FORM_ERRORS.INVALID_EMAIL_FORMAT)
            .regex(/[0-9]/, MESSAGES.FORM_ERRORS.INVALID_EMAIL_FORMAT),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: MESSAGES.FORM_ERRORS.PASSWORD_MISMATCH,
    });

export type RegisterFormValues = z.infer<typeof signUpSchema>;