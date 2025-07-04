import { z } from "zod";
import { MESSAGES } from "../helpers/messages";

export const formSchema = z
    .object({
        typeIdentification: z.string().nonempty(MESSAGES.FORM_ERRORS.REQUIRED_FIELD),
        identificationNumber: z.string().nonempty(MESSAGES.FORM_ERRORS.REQUIRED_FIELD),
        gender: z.string().nonempty(MESSAGES.FORM_ERRORS.REQUIRED_FIELD),
        civilStatus: z.string().nonempty(MESSAGES.FORM_ERRORS.REQUIRED_FIELD),
        brand: z.string().nonempty(MESSAGES.FORM_ERRORS.REQUIRED_FIELD),
        model: z.string().nonempty(MESSAGES.FORM_ERRORS.REQUIRED_FIELD),
        year: z.string().nonempty(MESSAGES.FORM_ERRORS.REQUIRED_FIELD),
        price: z.string()
            .transform((val) => Number(val))
            .refine((val) => !isNaN(val), { message: MESSAGES.FORM_ERRORS.INVALID_NUMBER })
            .refine((val) => val > 5000.01, { message: MESSAGES.FORM_ERRORS.MIN_PRICE })
    })
export type RegisterFormValues = z.infer<typeof formSchema>;