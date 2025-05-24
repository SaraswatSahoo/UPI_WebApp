const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");
const UserModel = require("../db");
const jwt = require("jsonwebtoken");

router.post("/signup", async ( req, res ) => {

    const requiredBody = z.object({
        firstname: z.string().min(3).max(30),
        lastname: z.string().min(3).max(30),
        email: z.string().email(),
        password: z.string(),
    })

    const { success } = requiredBody.safeParse( req.body );

    if( success ) {

        const { firstname, lastname, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });

        if(!existingUser){

            const encryptPassword = await bcrypt.hash( password, 10 );
            const user = await UserModel.create({
                firstname,
                lastname,
                email,
                password: encryptPassword,
            });

            const id = user._id

            res.status(200).json({
                message: "User Created Successfully"
            })

        } else {

            res.status(400).json({
                message: "User with same email already exists !!!"
            })

        }

    } else {

        res.status(400).json({
            message: "Incorrect Input !!!"
        })
    }

});

router.post("/signin", async ( req, res ) => {

    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const { success } = requiredBody.safeParse( req.body );

    if(success){

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if( user ){

            const verifyPassword = await bcrypt.compare( password, user.password );
            const id = user._id;

            if( verifyPassword ){

                const token = jwt.sign( { id }, process.env.JWT_SECRET );
                res.cookie("token", token);
                
                res.status(200).json({
                    message: "User Logged In"
                })

            } else {

                res.status(400).json({
                    message: "Incorrect Email or Password !!!"
                })

            }

        } else {

            res.status(400).json({
                message: "User does not exists !!!"
            })

        }

    }
})

module.exports = router;