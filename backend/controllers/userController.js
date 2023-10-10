const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        res.status(400);// bad error
        throw new Error("please add all details")
    }

    //check if user exists

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    //hash password
    const salt = await bcrypt.genSalt(10) //genSalt is used to hash the password.
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({ //ok, somth was created
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
    })
    } else {
        res.status(400)
        throw new Error("invalid data")
    }

    //res.json({ message: 'register user'})
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //check the user email
    const user = await User.findOne({ email })
    
    if( user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials ')
    }


    //res.json({ message: 'login user'})
});

const getMeUser = asyncHandler(async (req, res) => { //show which user has authenticated
    
   const { _id, name, email } = await User.findById(req.user.id);
   res.status(200).json( {id: _id, name, email })
   


});

//generate jwt
const generateToken =  (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}




module.exports = { registerUser, getMeUser, loginUser };