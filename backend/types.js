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

module.exports={
    signupBody: signupBody,
    signinBody: signinBody
}