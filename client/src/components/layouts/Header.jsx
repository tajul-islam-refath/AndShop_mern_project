import { Fragment } from 'react';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../store/actions/userActions'

import '../../App.css'


const Header = () => {

    const alart = useAlert();
    const dispatch = useDispatch();

    const { user, loading, isAuthenticated } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alart.success('Logged out successfully.')
    }
    return (
        <Fragment>
            <nav className="navbar row" >
                <div className="col-md-3">
                    <div className="navbar-brand" >
                        <Link to="/" >
                            <img className="nav_img" src="/images/eshop2.png" alt="shopIt" />
                        </Link>
                    </div>
                </div>

                <div className=" col-md-3 mt-4 mt-md-0 text-center" >
                    <Link to='/cart' >
                        <span id="cart" className="ml-3" >Cart</span>
                        <span className="ml-1" id="cart_count" >{cartItems.length ? cartItems.length : 0}</span>
                    </Link>
                </div>

                {isAuthenticated ? (
                    <div className="col-md-3 ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            <figure className="avatar avatar-nav">
                                <img
                                    src={user.avatar ? user.avatar.url : '/images/default_avatar.jpg'}
                                    alt={user && user.name}
                                    className="rounded-circle"
                                />
                            </figure>
                            <span>{user && user.name}</span>
                        </Link>

                        <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                            {user && user.role === 'admin' && (
                                <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                            )}
                            <Link className="dropdown-item" to="/orders/me">Orders</Link>
                            <Link className="dropdown-item" to="/me">Profile</Link>
                            <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                Logout
                            </Link>
                        </div>
                    </div>

                ) : !loading && <Link to="/auth/login" className="col-md-2 btn mr-4" id="login_btn">Login</Link>}


            </nav>
        </Fragment>
    );
}

export default Header;
