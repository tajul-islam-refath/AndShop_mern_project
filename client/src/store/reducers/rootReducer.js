import { combineReducers } from 'redux';

import {
    authReducer,
    userReducer,
    allUsersReducer,
    userDetailsReducer,
    userDashbordReducer
} from "./userReducer"

import {
    productsReducer,
    newProductReducer,
    productReducer,
    productDetailsReducer,
    newReviewReducer,
    productReviewsReducer,
    reviewReducer
} from './productReducer'

import {
    allOrdersReducer,
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    orderReducer
} from './orderReducer'

import { cartReducer } from '../reducers/chartReducer'

// admin state
import {
    categoryList,
    category
} from "../reducers/adminReducer"

const rootReducer = combineReducers({
    // users Reducers
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    dashbord: userDashbordReducer,

    // product Reducers
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newReview: newReviewReducer,

    // order reducers
    allOrders: allOrdersReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,

    // cart reducer
    cart: cartReducer,

    // admin reducers
    adminCategory: category,
    adminCategoryList: categoryList
})

export default rootReducer;