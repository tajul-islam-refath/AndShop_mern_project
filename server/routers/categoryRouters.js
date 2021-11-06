const router = require("express").Router()

const categoryValidation = require("../validators/categoryValidation")
const { isAuthenticatedUser, authorizeRoles } = require("../midlewares/authMidlewares")
const {
    createCategory,
    getCategory
} = require("../controlers/categoryController")


router.get("/get-categorys",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getCategory
)

router.post("/create-category",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    categoryValidation,
    createCategory)


module.exports = router