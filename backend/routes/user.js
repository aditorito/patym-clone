const { Router } = require("express");
const router = Router();
const { signupBody, signinBody, updateBody } = require('../types')
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware');
const { JWT_SECRET } = require('../config');
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

router.put("/user", authMiddleware,async (res, req) => {
    try {
        const { success } = updateBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message:"Error while updating"
            })            
        }
        await User.updateOne({_id:req.userId}, req.body);
        

        res.json({
            message:"Updated successfully"
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
})

router.get('/bulk', authMiddleware, async (res, req)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName: {
                "$regrex":filter
            }
    },{
        lastName:{
            "$regrex":filter
        }
    }]
    })
    
    if (!users) {
        res.json({
            message:"User not find"
        })
    }

    res.json({
        user: users.map((user)=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id:user._id
        }))
    });

});
module.exports = router;