import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './Homepage.css';

class Homepage extends Component {
    static contextType = APIContext;

    render() {

        return (
            <section className="Home">
                <h2>Follow custom paths with unique narrative experiences</h2>
                <div className='Browse'>
                    <h3><Link className='HomeLink' to='/browse-routes'>Browse Routes</Link></h3>
                    <div className='Image'>[image]</div>
                    <p>Browse routes by category: Personal, Tour Guides, Historic</p>
                </div>
                <div className='Create'>
                    <h3><Link className='HomeLink' to='/create-route'>Create Routes</Link></h3>
                    <div className='Image'>[image]</div>
                    <p>Create your own custom route with mutliple points of interest along the way.</p>
                </div>
            </section>
        )
    };
}

export default Homepage;