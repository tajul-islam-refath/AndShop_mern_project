const { check } = require("express-validator");

const categoryValidation = [
    check("name")
    .not().isEmpty().trim().withMessage("Category name is required"),
    check("slug")
    .not().isEmpty().trim().withMessage("Category slug is required"),
    check("visibility").not().isEmpty().withMessage("Visibility is required"),
    check("parentCategory")
    .not()
    .isEmpty()
    .withMessage("Parent category is required"),
]

module.exports = categoryValidation