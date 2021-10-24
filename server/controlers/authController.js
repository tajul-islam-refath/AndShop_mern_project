const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2;
const { validationResult } = require("express-validator")

const ErrorHandler = require('../utils/error')
const catchAsyncErrors = require('../midlewares/catchAsyncError')
const sendToken = require('../utils/sendToken')
const { errorFormater } = require("../utils/formetErrorMsg")



// User Register controller => '/api/user/register'
exports.registerUser = catchAsyncErrors(async(req, res, next) => {

    const errors = validationResult(req).formatWith(errorFormater)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped
        })
    }

    // const defaultAvatar = "https://res.cloudinary.com/rifat/image/upload/v1632969133/AndShopAvatar/q2bxof7g9hgquj053lcx.png";
    // upload default user avatar on cloudinary
    // const result = await cloudinary.uploader.upload(defaultAvatar, {
    //     folder: 'avatars',
    //     width: 150,
    //     crop: "scale"
    // })


    const {
        firstName,
        lastName,
        email,
        password,
        gender,
        year,
        month,
        day
    } = req.body

    const hashPass = await bcrypt.hash(password, 11);
    const user = {
        name: {
            firstName,
            lastName
        },
        password: hashPass,
        birthDate: {
            year,
            month,
            day
        },
        email,
        gender,
    }

    const newUser = await User.create(user)
    sendToken(newUser, 200, res);
})

// User login controller => '/api/user/login'
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormater)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        })
    }

    const { email } = req.body;

    // Finding user in database
    const user = await User.findOne({ email: email });

    sendToken(user, 200, res);
})

// Update user profile   =>   /api/user/me/update
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req).formatWith(errorFormater)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        })
    }

    // // Update avatar
    // if (req.body.avatar !== "") {
    //     const user = await User.findById(req.user.id)

    //     const image_id = user.avatar.public_id;
    //     const res = await cloudinary.uploader.destroy(image_id);

    //     const result = await cloudinary.uploader.upload(req.body.avatar, {
    //         folder: 'avatars',
    //         width: 150,
    //         crop: "scale"
    //     })

    //     newUserData.avatar = {
    //         public_id: result.public_id,
    //         url: result.secure_url
    //     }
    // }



    const { firstName, lastName, email, year, month, day, mobile, gender } = req.body
    const filter = { _id: req.user._id }
    const updateUserData = {
        name: {
            firstName,
            lastName
        },
        email: email ? email : req.user.email,
        birthDate: {
            year,
            month,
            day
        },
        mobile,
        gender,
        updatedAt: Date.now()
    }
    console.log(updateUserData)
    const user = await User.findByIdAndUpdate(filter, updateUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    console.log(user)
    res.status(200).json({
        token: user.getToken()
    })
})

// Forgot Password   =>  /api/user/password/forgot
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler('User Not Found', 404));
    }

    // Get Reset TOken
    const resetToken = user.getRestePasswordToken();

})

// Get Logged In User Profile => '/api/user/me'
exports.getUserProfile = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

// Update / Change password   =>  /api/user/password/update
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }


    const hashPass = await bcrypt.hash(req.body.password, 11);
    user.password = hashPass;
    await user.save();

    sendToken(user, 200, res)
})


// User logout controller => '/api/user/logout'
exports.logoutUser = catchAsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})

// Admin Routes
// Get all users   =>   /api/user/admin/users
exports.allUsers = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get user details   =>   /api/user/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update user profile   =>   /api/user/admin/user/:id
exports.updateUser = catchAsyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

// Delete user   =>   /api/user/admin/user/:id
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    // Remove avatar from cloudinary
    const image_id = user.avatar.public_id;
    await cloudinary.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
        success: true,
    })
})