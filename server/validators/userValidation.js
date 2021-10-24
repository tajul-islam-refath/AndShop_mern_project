const User = require('../model/userModel')
const { check } = require("express-validator");
const bcrypt = require('bcryptjs')

const signUpValidation = [
    check("firstName")
    .not().isEmpty().trim().withMessage("First name is required"),
    check("lastName")
    .not().isEmpty().trim().withMessage("Last name is required"),
    check("email").isEmail().normalizeEmail().withMessage("Email is required")
    .custom(async(email) => {
        const user = await User.findOne({ email: email })
        if (user) {
            return Promise.reject('This email already used');
        }

        return true;
    }),
    check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long"),
    check("gender").not().isEmpty().withMessage("Gender is required"),
]

const signInValidation = [
    check("email")
    .not().isEmpty().withMessage("Email is required")
    .isEmail().normalizeEmail().withMessage("Please provide a valid email")
    .custom(async(email) => {
        const user = await User.findOne({ email: email })
        if (!user) {
            return Promise.reject('Your email or password is not correct');
        }

        return true;
    }),
    check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long")
    .custom(async(password, { req }) => {
        const user = await User.findOne({ email: req.body.email }, { password: 1 })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return Promise.reject('Your email or password is not correct');
        }

        return true
    })
]

const updateProfileValidation = [
    check("firstName")
    .not().isEmpty().trim().withMessage("First name is required"),
    check("lastName")
    .not().isEmpty().trim().withMessage("Last name is required"),
    check("email")
    .custom(async(email) => {
        if (email) {
            const user = await User.findOne({ email: email })
            if (user) {
                return Promise.reject('This email already used');
            }
        }

        return true;
    }),
    check("gender").not().isEmpty().withMessage("Gender is required"),
    check("mobile").not().isEmpty().withMessage("Mobile number is required"),
]




module.exports = {
    signUpValidation,
    signInValidation,
    updateProfileValidation
}