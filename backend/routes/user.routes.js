const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");
const { UserModel, AccountModel } = require("../db");
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../middleware/AuthMiddleware");

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

            const hashedPassword = await bcrypt.hash( password, 10 );
            const user = await UserModel.create({
                firstname,
                lastname,
                email,
                password: hashedPassword,
            });

            const id = user._id;
            const token = jwt.sign( { id }, process.env.JWT_SECRET );
            
            await AccountModel.create({
                userId: id,
                balance: 1 + Math.random() * 10000
            })

            res.status(200).json({
                message: "User Created Successfully",
                token
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

                res.status(200).json({
                    message: "User Logged In",
                    token
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

    } else {

        res.status(400).json({
            message: "Incorrect Input !!!"
        })

    }
});

router.put("/", AuthMiddleware, async ( req, res ) => {

    const requiredBody = z.object({
        firstname: z.string().min(3).max(30),
        lastname: z.string().min(3).max(30),
        password: z.string(),
    });

    const { success } = requiredBody.safeParse( req.body );

    if( success ){

        const { firstname, lastname, password } = req.body;
        const hashedPassword = await bcrypt.hash( password, 10 );
        await UserModel.updateOne({ _id: req.id }, { firstname, lastname, password: hashedPassword});

        res.status(200).json({
            message: "Updated Successfully"
        })

    } else {

        res.status(400).json({
            message: "Error while updating information"
        })

    }
})

router.get("/bulk", AuthMiddleware, async( req, res ) => {

    console.log("Cookies received:", req.cookies);
    
    const filter = req.query.filter || "";

    const users = await UserModel.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        },{
            lastname: {
                "$regex": filter
            }
        }]
    });

    res.status(200).json({
        user: users.map( user => ({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            _id: user._id
        }))
    });

})

module.exports = router;