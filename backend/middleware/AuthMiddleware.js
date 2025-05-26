const jwt = require("jsonwebtoken");

const AuthMiddleware = ( req, res, next ) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(400).json({
            message: "Unauthorized"
        })
    }

    const token = authHeader.split(' ')[1];

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