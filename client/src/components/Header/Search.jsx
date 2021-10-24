import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

//Imports internal
import Headerlogincard from './HeaderLoginCard';
import logo from '../../assets/logo.png'
import avatarImg from '../../assets/avatar.png'
import { logout } from '../../store/actions/userActions'

const Search = () => {

    const alart = useAlert();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alart.success('Logged out successfully.')
    }

    const showLogin = () => {
        const doc = document.querySelector(".dropdown-login")
        if (doc.style.visibility == "hidden" || doc.style.visibility == "") {
            doc.style.top = "100%"
            doc.style.visibility = "visible"
            doc.style.opacity = 1

        } else {
            doc.style.top = "calc(100% + 10px)"
            doc.style.visibility = "hidden"
            doc.style.opacity = 0
        }
    }

    return (
        <div className="container">
            <div className="header-search d-flex justify-content-between align-items-center" >
                <div className="search-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="search-input d-flex">
                    <input type="text" placeholder="Search here.." />
                    <figure className="search-icon">
                        <SearchRoundedIcon />
                    </figure>
                </div>
                <div className="search-menu">
                    <ul>
                        <li>
                            <Badge badgeContent={cartItems.length ? cartItems.length : 0} color="primary">
                                <LocalMallIcon />
                            </Badge>
                        </li>
                        <li>
                            <Badge badgeContent={2} color="success">
                                <FavoriteIcon />
                            </Badge>
                        </li>
                        {/* if user login show avatar  */}
                        {isAuthenticated &&
                            <li className="dropdown-avatar" >
                                <Avatar
                                    alt="user"
                                    src={avatarImg}
                                    sx={{ width: 24, height: 24 }}
                                />
                                <div className="dropdown-avatar_card">
                                    <div className="card card-body py-3 ">
                                        <div className="avatar-info d-flex justify-content-center">
                                            <Avatar
                                                alt="user"
                                                src={user.avatar.url ? user.avatar.url : avatarImg}
                                                sx={{ width: 64, height: 64 }}
                                            />
                                        </div>
                                        <h6 className="text-center mt-3" >
                                            {`${user.name.firstName} ${user.name.lastName}`}
                                        </h6>
                                        <ul>
                                            <Link to="/user/profile" className="link" >

                                                <AccountCircleIcon />
                                                <span>
                                                    And Shop Profile
                                                </span>

                                            </Link>
                                            <Link to='/' onClick={() => logoutHandler()} className="link">
                                                <li >
                                                    <LogoutIcon />
                                                    <span> Log Out</span>
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        }

                        {
                            !isAuthenticated &&
                            <li className="login-dropdown" >
                                <PersonOutlineIcon
                                    onClick={() => {
                                        showLogin()
                                    }}
                                />
                                <div className="dropdown-login">
                                    <Headerlogincard />
                                </div>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Search;
