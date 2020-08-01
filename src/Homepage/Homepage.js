import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './Homepage.css';

class Homepage extends Component {
    static contextType = APIContext;

    render() {
        return (
            <section className="HomePage">
                <h2 className='homeTitle'>Get an insider's tour of places all over the world</h2>
                <section className='HomePage_intro'>
                    <img className='homePageTopImage' src='https://user-images.githubusercontent.com/58446465/88116801-4a343d00-cb6e-11ea-8e7a-c5eff81e3052.png' alt='Follow My Lead' />
                    <h3 className='homeSubTitle'>Follow custom routes made by users featuring unique narrative experiences across mutliple destinations.  Or create your own route to guide others through your favorite places!</h3>
                </section>
                <section className='HomePage_features'>
                    <div className='HomePage_browse featureBox'>
                        <Link className='homeLink' to='/browse-routes'><img src='https://user-images.githubusercontent.com/58446465/86996202-893fb700-c19a-11ea-8063-c670562ed48c.jpg' alt='Browse Routes' className='HomePageImage featureImage' /></Link>
                        <h3 className='homeHeader'><Link className='homeLink' to='/browse-routes'>Browse Routes</Link></h3>
                        <p className='homeText'>Browse routes by category: Tourist, Historic, or Personal</p>
                    </div>
                    <div className='HomePage_create featureBox'>
                        <Link className='homeLink' to='/create-route'><img src='https://user-images.githubusercontent.com/58446465/86996563-842f3780-c19b-11ea-8e60-7e317b72687f.jpg' alt='Create Route' className='HomePageImage featureImage' /></Link>
                        <h3 className='homeHeader'><Link className='homeLink' to='/create-route'>Create Routes</Link></h3>
                        <p className='homeText'>Create your own custom route with mutliple points of interest along the way.</p>
                    </div>
                </section>
            </section>
        );
    };
};

export default Homepage;