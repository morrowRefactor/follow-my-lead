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
                    <img src='https://user-images.githubusercontent.com/58446465/86996202-893fb700-c19a-11ea-8063-c670562ed48c.jpg' className='HomePageImage' />
                    <p>Browse routes by category: Personal, Tour Guides, Historic</p>
                </div>
                <div className='Create'>
                    <h3><Link className='HomeLink' to='/create-route'>Create Routes</Link></h3>
                    <img src='https://user-images.githubusercontent.com/58446465/86996563-842f3780-c19b-11ea-8e60-7e317b72687f.jpg' className='HomePageImage' />
                    <p>Create your own custom route with mutliple points of interest along the way.</p>
                </div>
            </section>
        )
    };
}

export default Homepage;