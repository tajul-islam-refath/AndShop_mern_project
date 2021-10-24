import React from 'react';
import './header.css'

import Search from './Search';
import NavBar from './NavBar'

const Header = () => {

    return (
        <section id="header" className="header-section" >
            <div className="header-top">
                <Search />
            </div>
            <div id="header-nav" className="header-nav">
                <NavBar />
            </div>
        </section>
    );
}

export default Header;
