const Category = require("../model/categoryModel")
const { validationResult } = require("express-validator")
const errorFormater = require("../utils/formetErrorMsg")


exports.getCategory = async(req, res, next) => {
    try {

        const categorys = await Category.find()
            // console.log(categorys)
        return res.status(200).json({
            categorys
        })

    } catch (err) {
        next(err)
    }
}

exports.createCategory = async(req, res, next) => {
    try {

        const errors = validationResult(req).formatWith(errorFormater)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.mapped
            })
        }

        const { name, slug, description, visibility, parentCategory } = req.body
        await Category.create({
            name,
            slug,
            visibility,
            parentCategory,
            userId: req.user._id,
            description: description ? description : ""
        })

        return res.status(201).json({
            success: true
        })

    } catch (error) {
        next(error)
    }
}