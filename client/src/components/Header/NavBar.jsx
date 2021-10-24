import { useEffect } from 'react';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../store/actions/userActions'





export default function NavBar() {

    useEffect(() => {
        const nav = document.querySelector(".nav-menu")
        const tabs = nav.getElementsByTagName("li")
        for (let tab of tabs) {
            tab.addEventListener("click", function () {
                let current = document.getElementsByClassName("active")
                current[0].classList.remove("active")
                tab.classList.add("active")
            })
        }
    }, [])


    return (
        <div className="container d-flex justify-content-between">
            <div className="nav-ctg">
                <ul>
                    <li>
                        <i class="fas fa-align-justify"></i>
                        <h6>CATEGORIES</h6>
                        <i class="fas fa-chevron-down"></i>
                    </li>
                </ul>
            </div>
            <nav className="nav-menu">
                <ul>
                    <li className="nav-li active" >
                        <b class="left-curve"></b>
                        <b class="right-curve"></b>
                        <Link to="/" >Home</Link>
                    </li>
                    <li className="nav-li ">
                        <b class="left-curve"></b>
                        <b class="right-curve"></b>
                        <Link to="/" >Shop</Link>
                    </li>
                    <li className="nav-li">
                        <b class="left-curve"></b>
                        <b class="right-curve"></b>
                        <Link to="/" >About Us</Link>
                    </li>
                    <li className="nav-li">
                        <b class="left-curve"></b>
                        <b class="right-curve"></b>
                        <Link to="/" >Privacy Policy</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

