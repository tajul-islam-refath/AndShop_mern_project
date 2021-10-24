import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
// import scss css file
import './Style/main.css'



// import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import SingleProduct from './components/product/SingleProduct';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

import { useSelector } from 'react-redux'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'





import { loadUser } from './store/actions/userActions'
// Protected Route
import ProtectedRoute from './components/privateRoute/ProtectedRoute'
//import topbar
import Topbar from './components/TopBar/TopBar';
//import Header
import Header from './components/Header/Header'
//Home Page
import Home from './Pages/Home/Home';
//Auth pages
import AuthLogin from './Pages/Auth/AuthLogin'
import AuthSignup from './Pages/Auth/AuthSignup';
//Profile import
import UserDashbord from './Pages/Dashbord/UserDashbord'

// admin
import Admin from './Admin/Admin'

const AndShop = ({ match }) => {
  const [stripeApiKey, setStripeApiKey] = useState('');
  return (
    <>
      <Topbar />
      <Header />
      <Route path="/" component={Home} exact />
      <Route path="/auth/login" component={AuthLogin} />
      <Route path="/signup" component={AuthSignup} />
      <Route path='/product/:id' component={SingleProduct} />
      <Route path='/cart' component={Cart} />
      <ProtectedRoute path='/shipping' component={Shipping} />
      <ProtectedRoute path='/confirm' component={ConfirmOrder} />
      <ProtectedRoute path='/success' component={OrderSuccess} />
      {/* <Elements stripe={loadStripe(stripeApiKey)}>
        <ProtectedRoute path="/payment" component={Payment} />
      </Elements> */}
      <ProtectedRoute path="/user/:tab" component={UserDashbord} />
    </>
  );
}

const App = (props) => {
  const [stripeApiKey, setStripeApiKey] = useState('');

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <Router >
      <div className="App">
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={AndShop} />
        </Switch>
      </div>
    </Router>
  );
}




export default App;
