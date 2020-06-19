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
        }

        for(let i = 0; i < this.context.locations.length; i++) {
            if(this.context.locations[i].id === this.props.locationID) {
                location = {
                    city: this.context.locations[i].city,
                    state_province: this.context.locations[i].state_province,
                    country: this.context.locations[i].country
                };
            }
        }

        return (
            <section className="RouteSummary">
                <h3><Link className='RouteLink' to={`/routes/${this.props.routeID}`}>{this.props.routeName}</Link></h3>
                <span className='Location'><em>{location.city}, {location.state_province}</em></span>
                <div className='SummImage'>[image]</div>
                <p>{this.props.routeSumm}</p>
            </section>
        )
    };
}

export default RouteSummary;