import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CategoryIcon from '@mui/icons-material/Category';
import AddTaskIcon from '@mui/icons-material/AddTask';
//Icons 
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import logo from "../../../assets/logo.png"




const Sidenav = () => {
    const [catalogOpen, setCatalogOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)


    useEffect(() => {
        let index = localStorage.getItem("selectedItem")
        setSelectedIndex(JSON.parse(index))
    }, [])


    useEffect(() => {
        window.localStorage.setItem("selectedItem", JSON.stringify(selectedIndex))
    }, [selectedIndex])


    return (
        <Paper className="sidenav">
            <Paper className="sidenav__top d-flex  justify-content-between align-items-center" >
                <img src={logo} alt="And Shop Logo" className="sidenav__top--logo" />
            </Paper>
            <nav className="sidenav__nav" >
                <MenuList>

                    <Link to="/admin/dashbord" >
                        <MenuItem
                            className={selectedIndex == 0 && "sidenav_nav-active"}
                            onClick={() => setSelectedIndex(0)}
                        >
                            <i><DashboardCustomizeIcon /></i>
                            <a href="#" >Dashbord</a>
                        </MenuItem>
                    </Link>

                    <MenuItem
                        onClick={() => {
                            setCatalogOpen(!catalogOpen)
                        }}
                    >
                        <div>
                            <i><PlaylistAddIcon /></i>
                            <Link>Catalog</Link>
                        </div>
                        {catalogOpen ? <ExpandLess /> : <ExpandMore />}
                    </MenuItem>
                    <Collapse
                        in={catalogOpen}
                        timeout="auto"
                        unmountOnExit
                        className="nav__collapse"
                    >
                        <Link >
                            <MenuItem
                                className={selectedIndex == 2 && "sidenav_nav-active"}
                                onClick={() => setSelectedIndex(2)}
                            >
                                <i><FormatListBulletedIcon /></i>
                                <Link>Product List</Link>
                            </MenuItem>
                        </Link>

                        <Link to="/admin/create-product"  >
                            <MenuItem
                                className={selectedIndex == 3 && "sidenav_nav-active"}
                                onClick={() => setSelectedIndex(3)}
                            >
                                <i><AddIcon /></i>
                                <a href="" >Product</a>
                            </MenuItem >
                        </Link>

                        <Link to="/admin/category-list">
                            <MenuItem
                                className={selectedIndex == 4 && "sidenav_nav-active"}
                                onClick={() => setSelectedIndex(4)}
                            >
                                <i><CategoryIcon /></i>
                                <Link>Category List</Link>
                            </MenuItem>
                        </Link>

                        <Link to="/admin/add-category" >
                            <MenuItem
                                className={selectedIndex == 5 && "sidenav_nav-active"}
                                onClick={() => setSelectedIndex(5)}
                            >
                                <i><AddTaskIcon /></i>
                                <a href>Category</a>
                            </MenuItem>
                        </Link>
                    </Collapse>

                    <MenuItem
                        className={selectedIndex == 6 && "sidenav_nav-active"}
                        onClick={() => setSelectedIndex(6)}
                    >
                        <i><GroupIcon /></i>
                        <Link>Customers</Link>
                    </MenuItem>
                    <MenuItem
                        className={selectedIndex == 7 && "sidenav_nav-active"}
                        onClick={() => setSelectedIndex(7)}
                    >
                        <i><ShoppingCartIcon /></i>
                        <Link>Orders</Link>
                    </MenuItem>
                    <MenuItem
                        className={selectedIndex == 8 && "sidenav_nav-active"}
                        onClick={() => setSelectedIndex(8)}
                    >
                        <i><FavoriteBorderIcon /></i>
                        <Link>Marketing</Link>
                    </MenuItem>
                </MenuList>
            </nav>
        </Paper>
    );
}

export default Sidenav;
