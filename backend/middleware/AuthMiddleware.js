const jwt = require("jsonwebtoken");

const AuthMiddleware = ( req, res, next ) => {

    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message: "Unauthorized"
        })
    }

    try {

        const decoded = jwt.verify( token, process.env.JWT_SECRET);
        req.id = decoded.id;
        next();

    } catch (err){

        res.status(400).json({
            message: "Unauthorized"
        })

    }
}

module.exports = AuthMiddleware;