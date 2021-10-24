const router = require('express').Router();


// Imports all controllers
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updatePassword,
    updateProfile,
    //asmin route controller 
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require('../controlers/authController')

// user authenticate check
const { isAuthenticatedUser, authorizeRoles } = require('../midlewares/authMidlewares')

// user validation check
const { signUpValidation, signInValidation, updateProfileValidation } = require("../validators/userValidation")


// user register , login , logout
router.post('/register', signUpValidation, registerUser);
router.post('/login', signInValidation, loginUser);
router.get('/logout', logoutUser);


// user profile, profileUpdate, passwordUpdate routes
router.get('/me', isAuthenticatedUser, getUserProfile)
router.put('/me/update', isAuthenticatedUser, updateProfileValidation, updateProfile)
router.put('/password/update', isAuthenticatedUser, updatePassword)

// admin route
router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router