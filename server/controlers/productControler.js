const Product = require('../model/productModel')
const ErrorHandler = require('../utils/error')
const catchAsyncError = require('../midlewares/catchAsyncError')
const cloudinary = require('cloudinary').v2;
const APIFeatures = require('../utils/apiFeatures')


// create new product => 
exports.createProduct = async(req, res, next) => {
    try {

        let images = []
        if (typeof req.body.images === 'string') {
            images.push(req.body.images)
        } else {
            images = req.body.images
        }

        let imagesLinks = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'AndShop Products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        // req.body.images = imagesLinks
        // req.body.user = req.user._id;

        let ratings = 0;
        let numOfReviews = 0;
        let reviews = [];
        let userId = req.user._id;
        const {
            name,
            slug,
            description,
            shortDescription,
            price,
            oldPrice,
            discount,
            sku,
            stock,
            visibility,
            categoryId
        } = req.body

        const product = {
            name,
            slug,
            description,
            shortDescription,
            price,
            oldPrice,
            discount,
            sku,
            stock,
            visibility,
            categoryId,
            ratings,
            numOfReviews,
            reviews,
            userId,
            images: imagesLinks
        }


        const createdProduct = await Product.create(product);

        // console.log(createdProduct)

        res.status(200).json({
            success: true,
            message: 'Product Create Successfully',
        })
    } catch (error) {
        next(error)
    }
}

// // get all products => "/api/products?keyword=value"
// exports.getProducts = catchAsyncError(async(req, res, next) => {

//     const resPerPage = 4;
//     const productsCount = await Product.countDocuments();


//     const apiFeatures = new APIFeatures(Product.find(), req.query)
//         .search()
//         .filter()

//     let products = await apiFeatures.query;
//     let filteredProductsCount = products.length;

//     apiFeatures.pagination(resPerPage)
//     products = await apiFeatures.query;

//     if (!products) {
//         return next(new ErrorHandler('There Are No Products', 404))
//     }

//     res.status(200).json({
//         success: true,
//         message: 'Get All Products Successfully',
//         productsCount,
//         resPerPage,
//         filteredProductsCount,
//         products
//     })
// })


// get all products => "/api/products"
exports.getProducts = catchAsyncError(async(req, res, next) => {
    const resPerPage = 4;
    const productsCount = await Product.countDocuments();


    let products = await Product.find();
    let filteredProductsCount = products.length;

    const currentPage = Number(req.query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    // products = products.limit(resPerPage).skip(skip);

    if (!products) {
        return next(new ErrorHandler('There Are No Products', 404))
    }

    res.status(200).json({
        success: true,
        message: 'Get All Products Successfully',
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})

// Get all products (Admin)  =>   /api/products/admin/products
exports.getAdminProducts = catchAsyncError(async(req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})


// get single product => "/api/products/:id"
exports.getSingleProduct = catchAsyncError(async(req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Get Product Successfully',
        product
    })
})


// update  product => "/api/products/admin/product/:id"
exports.updateProduct = catchAsyncError(async(req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById({ _id: id });

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }

    product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'Product Update Successfully',
        product
    })
})

// delete product => "/api/products/admin/product/:id"
exports.deleteProduct = catchAsyncError(async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.uploader.destroy(product.images[i].public_id)
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })

})



// Create new review   =>   /api/products/:id/review
exports.createProductReview = catchAsyncError(async(req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})

// Get Product Reviews   =>   /api/products/:id/reviews
exports.getProductReviews = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/products/:id/review
exports.deleteReview = catchAsyncError(async(req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})