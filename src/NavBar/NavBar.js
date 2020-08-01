import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './NavBar.css';

class Navbar extends Component {
    static contextType = APIContext;

    render() {
        return (
            <nav className="TopNav">
                <img className='topNavLogo' src='https://user-images.githubusercontent.com/58446465/88106759-d63c6980-cb5a-11ea-80c4-25caf6b14855.png' alt='Follow My Lead Logo' />
                <div className="mainTitle"><Link className="navTitle" to='/'>Follow My Lead</Link></div>
                <div className="hamburger"><button className='navHamburger' onClick={() => {this.context.toggleNav()}}>&#9776;</button></div>
                <div className="break"></div>
                <ul className={this.context.navbar}>
                    <li><Link className='navLink' to='/browse-routes'>Browse Routes</Link></li>
                    <li><Link className='navLink' to='/create-route'>Create Route</Link></li>
                </ul>
            </nav>
        );
    };
};

export default Navbar;