import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './NavBar.css';

class Navbar extends Component {
    static contextType = APIContext;

    render() {

        return (
            <nav className="topnav">
                <div className="main-title"><Link className="homelink" to='/'>Follow My Lead</Link></div>
                <div className="hamburger"><button onClick={() => {this.context.toggleNav()}}>&#9776;</button></div>
                <div className="break"></div>
                <ul className={this.context.navbar}>
                    <li><Link className='navlink' to='/browse-routes'>Browse Routes</Link></li>
                    <li><Link className='navlink' to='/create-route'>Create Route</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;