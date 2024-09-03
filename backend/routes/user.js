const { Router } = require("express");
const router = Router();
const { signupBody, signinBody } = require('../types')
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config')
const { User } = require('../db/index')


router.post('/signup',async (req,res)=>{
    try {
        const { success } = signupBody.safeParse(req.body);
        if ( !success ) {
            return res.status(411).json({
                message: " Incorrect Input"
            })   
        }
        const existingUser = await User.findOne({
            username: req.body.username
        })

        if (existingUser) {
            return res.status(411).json({
                message: "Email is already taken!!"
            })
            
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token
        });


        
    } catch (error) {
        console.log(error);
            
    }
});

router.post('/signin',async (req,res)=>{
    try {
        const { success } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message:"Incorrect inputs"
            })
            
        }
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })

        const userId = user._id;
        
        if (user) {
            const token = jwt.sign({
                userId
            }, JWT_SECRET);

            res.json({
                token: token
            })
            return;
            
        }
        res.status(411).json({
            message: "Error while logging up"
        })

        
    } catch (error) {
        console.log(error);
        
        
    }
});

module.exports = router;