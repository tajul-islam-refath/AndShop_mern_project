import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,

    // User dashbords types
    GET_USER_DASHBORD_INFO_REQUEST,
    GET_USER_DASHBORD_INFO_SUCCESS,
    GET_USER_DASHBORD_INFO_FAIL,
    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAIL,
    GET_USER_ADDRESSES_REQUEST,
    GET_USER_ADDRESSES_SUCCESS,
    GET_USER_ADDRESSES_FAIL,
    DASHBORD_RESET,
    DASHBORD_CLEAR_ERRORS
} from '../Types/userTypes'

// auth reducer
export const authReducer = (state = { user: {}, isAuthenticated: false, loading: false }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


// User Reducer
export const userReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const userDashbordReducer = (state = {
    userInfo: {},
    addresses: [],
    userUpdated: false,
    newAddressCreated: false,
    loading: false
}, action) => {

    switch (action.type) {
        case GET_USER_DASHBORD_INFO_REQUEST:
        case GET_USER_INFO_REQUEST:
        case GET_USER_ADDRESSES_REQUEST:
        case UPDATE_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                userUpdated: true
            }
        case DASHBORD_RESET:
            return {
                ...state,
                loading: false,
                userUpdated: false,
                newAddressCreated: false
            }
        case DASHBORD_CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


// all User Reducer
export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}


// User Details Reducer
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}