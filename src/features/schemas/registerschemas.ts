import z from 'zod';

export const registerSchema = z.object({
    email: z.string().min(1, {
        message: 'Email is required'
    }).email(),

    first_name: z.string().min(1, {
        message: 'First name is required'
    }),
    
    last_name: z.string().min(1, {
        message: 'Last name is required'
    }),

    role: z.string().min(1),

    password: z.string().min(1, {
        message: 'Password is required'
    }),

    confirm_password: z.string().min(1),
    marketing_consent: z.boolean()
})