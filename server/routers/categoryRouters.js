const router = require("express").Router()

const categoryValidation = require("../validators/categoryValidation")
const { isAuthenticatedUser, authorizeRoles } = require("../midlewares/authMidlewares")
const { createCategory } = require("../controlers/categoryController")


router.post("/create-category",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    categoryValidation,
    createCategory)


module.exports = router