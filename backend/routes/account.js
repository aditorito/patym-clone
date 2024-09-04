const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware");
const { Account } = require("../db/index");
const { default: mongoose } = require("mongoose");

router.get("/balance",authMiddleware, async (req,res)=>{
    try {
        const account = await  Account.findOne({
            userId: req.userId
        })   
        res.json({
            balance:account.balance
        })   
    } catch (error) {
        console.log(error);
        
    }
});

router.post("/transfer", authMiddleware, async (req, res)=>{
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount,  to }  = req.body;

        const account = await Account.findOne({userId: req.userId}).session(session);

        if (account.balance < amount) {
            await session.abortTransaction();
            res.status(400).json({
                message: "Insufficient balance"
            });            
        }
        const toaccount = await Account.findOne({userId:to}).session(session);

        if(!toaccount){
            await session.abortTransaction();
            res.status(400).send({
                message: "Invalid account"
            });
        }

        await Account.updateOne({userId: req.userId}, { $inc: { balance: -amount}}).session(session);
        await Account.updateOne({userId: to}, { $inc: { balance: amount}}).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer succesful"
        })
        
        
    } catch (error) {
        console.log(error);
        
        
    }
})

module.exports = router