const z = require('zod');

const signupBody = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
})

const signinBody = z.object({
    username:z.string().email(),
    password: z.string()
})

const updateBody = z.object({
    password: z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})

module.exports={
    signupBody: signupBody,
    signinBody: signinBody,
    updateBody:updateBody
}