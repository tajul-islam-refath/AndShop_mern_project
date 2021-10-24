import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import './Scss/Admin.css'
import Header from './Components/Header/Header'
import SideNav from './Components/SideNav/SideNav'
import Dashbord from "./Pages/Dashbord/Dashbord"
import Product from "./Pages/Product/Product"
import Category from './Pages/Category/Category'
import Categorylist from "./Pages/Category/CategoryList"

const Admin = () => {

    function openNav() {
        const snav = document.getElementById("mySidebar")
        if (snav.style.width === "0px") {
            document.getElementById("mySidebar").style.width = "280px";
            document.getElementById("main").style.marginLeft = "280px";
        } else {
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
    }

    if (!window.localStorage.getItem("selectedItem")) {
        window.localStorage.setItem("selectedItem", JSON.stringify(0))
    }

    return (
        <>
            <div id="mySidebar" className="sidebar">
                <SideNav />
            </div>

            <div id="main">
                <Header openNav={openNav} />
                <Switch>
                    <Route path="/admin" exact  >
                        <Redirect to="/admin/dashbord" />
                    </Route>
                    <Route path="/admin/dashbord" component={Dashbord} exact />
                    <Route path="/admin/create-product" component={Product} exact />
                    <Route path="/admin/category-list" component={Categorylist} exact />
                    <Route path="/admin/add-category" component={Category} exact />
                </Switch>
            </div>
        </>
    );
}

export default Admin;
