//middleware is a function that runs during the request response circle. checks the token.


const jwt = require("jsonwebtoken");
const asynHandler = require("express-async-handler");
const User = require("../model/userModel");

const protect = asynHandler(async (req, res, next) => {
    let token;

    //check if the authorization is there and it starts with Bearer
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
        //get token from header
        token = req.headers.authorization.split(" ")[1]

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Get user from the token
        req.user = await User.findById(decoded.id).select('-password')

        next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})




module.exports = { protect }