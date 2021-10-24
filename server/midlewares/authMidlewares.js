const User = require('../model/userModel')

const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/error')
const catchAsyncError = require('./catchAsyncError')


exports.bindUserWithReq = () => {
    return async(req, res, next) => {
        if (!req.cookies.token) {
            return next()
        }

        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next()
        } catch (e) {
            console.log(e);
            next(e)
        }
    }
}

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncError(async(req, res, next) => {
    // console.log(req.cookies)
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login Required', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    req.user = await User.findById(decoded.id);
    next();
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}