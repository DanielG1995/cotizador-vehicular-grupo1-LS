import { z } from "zod";
import { MESSAGES } from "../helpers/messages";

export const signInSchema = z
    .object({
        email: z.string().email(MESSAGES.FORM_ERRORS.INVALID_EMAIL),
        password: z
            .string()
            .min(6, MESSAGES.FORM_ERRORS.PASSWORD_TOO_SHORT)
    })

export type RegisterFormValues = z.infer<typeof signInSchema>;