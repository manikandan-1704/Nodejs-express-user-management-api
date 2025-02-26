const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    if ( !username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const availableUser = await User.findOne({where:{email}});
    if(availableUser){
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password", hashedPassword);

    const user = await User.create({
        username, 
        email, 
        password: hashedPassword
    });
    if(user){
        res.status(201).json({message: "User created successfully!!", data: {id: user.id, username: user.username, email: user.email}});
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
})

const loginUser = asyncHandler(async(req,res) => {
    const { email, password } = req.body;
    if( !email || !password ) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({where:{email}});
    console.log("User", user);
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
            user: {
            username: user.username,
            email: user.email,
            id: user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    );
    res.status(200).json({message: "User logged in successfully", accessToken});
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

const currentUser = asyncHandler(async(req,res) => {
    res.json({message: "Current user", user: req.user});
})

module.exports = { registerUser, loginUser, currentUser };  