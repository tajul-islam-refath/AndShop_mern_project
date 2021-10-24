import { createStore, applyMiddleware } from 'redux'
import thank from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// rootReducer Import
import rootReducer from './reducers/rootReducer'


let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ?
            JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
}

let middleware = [thank];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;