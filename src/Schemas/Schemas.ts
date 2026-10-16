import * as z from 'zod'

export const Schemas = z.object({
    name: z.string(),
    avatar: z.string(),
    job: z.string(),
    email: z.string(),
    age: z.coerce.number(),
    status: z.boolean()
})