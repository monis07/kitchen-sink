import {z} from "zod"

 export const signUpInput = z.object({
    username:z.string().min(1).max(20),
    password:z.string().min(1).max(20)
 })

export type signUpParams = z.infer<typeof signUpInput>