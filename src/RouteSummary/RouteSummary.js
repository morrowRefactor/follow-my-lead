import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';
import './RouteSummary.css';

class RouteSummary extends Component {
    static contextType = APIContext;

    render() {
        let location = {
            city: '',
            state_province: '',
            country: ''
        };

        // use preset images based on route type
        let routeType = '';
        let routeImage = '';
        if(this.props.routeType === 1) {
            routeType = 'Tourist Route';
            routeImage = 'https://user-images.githubusercontent.com/58446465/87073383-d5c3da80-c20c-11ea-981a-1785988fcbeb.jpg';
        };
        if(this.props.routeType === 2) {
            routeType = 'Historic Route';
            routeImage = 'https://user-images.githubusercontent.com/58446465/87073369-d0669000-c20c-11ea-8e75-5f48a0f9aea3.jpg';
        };
        if(this.props.routeType === 3) {
            routeType = 'Personal Route';
            routeImage = 'https://user-images.githubusercontent.com/58446465/87073376-d3618080-c20c-11ea-9f06-1a89131e441c.jpg';
        };

        for(let i = 0; i < this.context.locations.length; i++) {
            if(this.context.locations[i].id === this.props.locationID) {
                location = {
                    city: this.context.locations[i].city,
                    state_province: this.context.locations[i].state_province,
                    country: this.context.locations[i].country
                };
            };
        };

        return (
            <section className='RouteSummary featureBox'>
                <Link className='routeLink' to={`/routes/${this.props.routeID}`}><img className='routeSummImage featureImage' src={routeImage} alt={this.props.routeName} /></Link>
                <p className='routeSummType'>{routeType}</p>
                <h3 className='routeSummTitle'><Link className='routeLink' to={`/routes/${this.props.routeID}`}>{this.props.routeName}</Link></h3>
                <span className='location'><em>{location.city}, {location.state_province}</em></span>
                <p className='routeSummContent'>{this.props.routeSumm}</p>
            </section>
        );
    };
};

export default RouteSummary;