const router = require('express').Router();

const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder
} = require('../controlers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../midlewares/authMidlewares')

router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder)
router.route('/orders/me').get(isAuthenticatedUser, myOrders)


// admin routes
router.route('/admin/orders/').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders)
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)


module.exports = router