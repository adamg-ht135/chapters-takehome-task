import z from 'zod';

export const bookSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    author: z.number({
        invalid_type_error: 'Not a number',
        required_error: 'Author is required',
    }),
    date_published: z.string().min(1, {
        message: 'Date is required',
    }),
})