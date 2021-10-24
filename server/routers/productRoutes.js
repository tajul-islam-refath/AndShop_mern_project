const router = require('express').Router();

const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getAdminProducts,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('../controlers/productControler')

const { isAuthenticatedUser, authorizeRoles } = require('../midlewares/authMidlewares')

router.get('/', getProducts);
router.get('/:id', getSingleProduct);

// admin routes
router.get('/admin/products', getAdminProducts)
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// review routes
router.post('/review', isAuthenticatedUser, createProductReview)
router.get('/reviews', isAuthenticatedUser, getProductReviews)
router.delete('review', isAuthenticatedUser, deleteReview)

module.exports = router