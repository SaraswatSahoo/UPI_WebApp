const express = require("express")
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");
const { AccountModel } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", AuthMiddleware, async ( req, res ) => {

    const account = await AccountModel.findOne({
        userId: req.id
    });

    res.status(200).json({
        balance: account.balance
    });

})

router.post("/transfer", AuthMiddleware, async ( req, res ) => {

    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await AccountModel.findOne({ userId: req.id }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance !!!"
        });
    }

    const toAccount = await AccountModel.findOne({ userId: to }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid Account !!!"
        });
    }

    await AccountModel.updateOne({userId:req.id},{$inc:{balance:-amount}}).session(session);
    await AccountModel.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer Successful"
    })
    
})

module.exports = router;