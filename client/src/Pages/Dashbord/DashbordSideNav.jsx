import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import avatar from '../../assets/avatar.png'

const DashbordSideNav = ({ tab }) => {
    const { user } = useSelector(state => state.auth)
    return (
        <>
            <div className="text-center top">
                <div className="sidenav-profilepic mb-4">
                    <div className="profilepic">
                        <img className="bg-info rounded-circle" src={
                            user.avatar.url ? user.avatar.url : avatar
                        } alt="" />
                    </div>
                </div>
                <div className="profile-info">
                    <h5>
                        <span>
                            {user && `${user.name.firstName} ${user.name.lastName}`}
                        </span>
                        <i class="far fa-check-circle"></i>
                    </h5>
                    <p>
                        {user.mobile && user.mobile}
                    </p>
                </div>
            </div>
            <nav id="sidenavbar" className="sidenavbar" >
                <ul>
                    <li className={tab === "profile" ? "sidenav__active" : ""} >
                        <Link to="/user/profile" >
                            <i class="fas fa-align-justify"></i>
                            Dashbord
                        </Link>
                    </li>
                    <li className={tab === "account" ? "sidenav__active" : ""} >
                        <Link to="/user/account" >
                            <i class="fas fa-user-tie"></i>
                            Account Information
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/addresses" >
                            <i class="fas fa-map-marker-alt"></i>
                            Addresses
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/orders" >
                            <i class="fas fa-list"></i>
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/change-password" >
                            <i class="fas fa-key"></i>
                            Change Password
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default DashbordSideNav;
