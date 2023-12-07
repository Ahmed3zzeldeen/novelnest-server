const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/generateJWT");
const userRoles = require('../utils/userRoles');
const path = require('path');

const getAllUsers = asyncWrapper(async (req,res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const users = await User.find({}, {"__v": false, 'password': false}).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: {users}});
})

const getUserById = asyncWrapper(async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id, {"__v": false});
    if(!user) {
        const error = appError.create('User not found', 404, httpStatusText.FAIL)
        return next(error);
    }
    res.json({ status: httpStatusText.SUCCESS, data: {user}});
});

const deleteUserById = asyncWrapper(async (req,res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if(!user) {
        const error = appError.create('User not found', 404, httpStatusText.FAIL)
        return next(error);
    }
    res.json({ status: httpStatusText.SUCCESS, data: {user}});
});

const updateUserById = asyncWrapper(async (req,res , next) => {
    const id = req.params.id;
    let { firstName, lastName, email , username , password } = req.body;
    email = email.toLowerCase();
    username = username.toLowerCase();

    const user = await User.findById(id);
    if(!user) {
        const error = appError.create('User not found', 404, httpStatusText.FAIL)
        return next(error);
    }

    if(id !== req.currentUser.id && req.currentUser.role !== userRoles.ADMIN ) {
        const error = appError.create('You are not allowed to update this user', 403, httpStatusText.FAIL)
        return next(error);
    }

    if(firstName) {
        user.firstName = firstName;
    }
    if(lastName) {
        user.lastName = lastName;
    }
    if(email) {
        user.email = email;
    }
    if(username) {
        user.username = username;
    }
    if(password) {
        const hashedPassword = await bcrypt.hash(password, 10);    
        user.password = hashedPassword;
    }
    if(req.file) {
        let avatarFileName = req.file.filename;
        user.avatar = path.join('uploads' , avatarFileName);
    }
    
    await user.save();
    
    res.status(200).json({status: httpStatusText.SUCCESS, data: {user: user}})
});

const updateUserRoleById = asyncWrapper(async (req,res ,next) => {
    const id = req.params.id;
    const { role } = req.body;

    const user = await User.findById(id);

    if(!user) {
        const error = appError.create('User not found', 404, httpStatusText.FAIL)
        return next(error);
    }

    if(!role) {
        const error = appError.create('Role is required', 400, httpStatusText.FAIL)
        return next(error);
    }

    user.role = role;
    await user.save();

    res.status(200).json({status: httpStatusText.SUCCESS, data: {user: user}})
});

const signup = asyncWrapper(async (req, res, next) => {
    let { firstName, lastName, email , username , password, role } = req.body;
    email = email.toLowerCase();
    username = username.toLowerCase();
    
    const oldUser = await User.findOne({ email: email});
    if(oldUser) {
        const error = appError.create('User already exists', 400, httpStatusText.FAIL)
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);    
    const newUser = new User({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
        role
    })

    // generate JWT token 
    const token = await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role});
    newUser.token = token;
    await newUser.save();
    
    res.status(201).json({status: httpStatusText.SUCCESS, data: {user: newUser}})
})

const login = asyncWrapper(async (req, res, next) => {
    let {email, password} = req.body;
    email = email.toLowerCase();
    
    if(!email && !password) {
        const error = appError.create('Email and password are required', 400, httpStatusText.FAIL)
        return next(error);
    }

    const user = await User.findOne({email: email});
    if(!user) {
        const error = appError.create('User not found', 400, httpStatusText.FAIL)
        return next(error);
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if(user && matchedPassword) {
        // logged in successfully
        const token = await generateJWT({email: user.email, id: user._id, role: user.role});
        return res.json({ status: httpStatusText.SUCCESS, data: {token}});
    } else {
        const error = appError.create('something wrong', 500, httpStatusText.ERROR)
        return next(error);
    }

})


module.exports = {
    signup,
    login,
    getAllUsers,
    getUserById,
    updateUserById,
    updateUserRoleById,
    deleteUserById
}