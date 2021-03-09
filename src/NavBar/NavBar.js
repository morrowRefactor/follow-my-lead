import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './NavBar.css';

class Navbar extends Component {
    static contextType = APIContext;

    handleMenuToggle = () => {
        if(window.innerWidth < 1200) {
            this.context.toggleNav()
        }
    };

    homeMenuToggle = () => {
        if(this.context.navbar === 'show') {
          this.context.toggleNav();
        }
    };

    render() {
        return (
            <section className="TopNav">
                <img className='topNavLogo' src='https://user-images.githubusercontent.com/58446465/88106759-d63c6980-cb5a-11ea-80c4-25caf6b14855.png' alt='Follow My Lead Logo' />
                <div className="mainTitle"><Link className="navTitle" to='/' onClick={() => {this.homeMenuToggle()}}>Follow My Lead</Link></div>
                <div className="hamburger"><button className='navHamburger' onClick={() => {this.context.toggleNav()}}>&#9776;</button></div>
                <div className="break"></div>
                <section className={this.context.navbar}>
                  <section className='TopNav_contentContainer'>
                    <ul>
                        <li><Link className='navLink' to='/browse-routes' onClick={() => {this.handleMenuToggle()}}>Browse Routes</Link></li>
                        <li><Link className='navLink' to='/create-route' onClick={() => {this.handleMenuToggle()}}>Create Route</Link></li>
                    </ul>
                  </section>
                </section>
            </section>
        );
    };
};

export default Navbar;