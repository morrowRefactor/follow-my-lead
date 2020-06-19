import React, { Component } from 'react';
import Destination from '../Destination/Destination';
import APIContext from '../APIContext';
import './RoutePage.css';

class RoutePage extends Component {
    static contextType = APIContext;

    render() {
        let routeID = this.props.match.params.route_id;

        let route = {
            name: '',
            routeType: 0,
            location: 0
        }

        let location = {
            city: '',
            state_province: '',
            country: ''
        }

        for(let i = 0; i < this.context.routes.length; i++) {
            if(this.context.routes[i].id === parseInt(routeID)) {
                route = {
                    name: this.context.routes[i].route_name,
                    routeType: this.context.routes[i].route_type_id,
                    location: this.context.routes[i].route_location
                }
            }
        }

        for(let i = 0; i < this.context.locations.length; i++) {
            if(this.context.locations[i].id === route.location) {
                location = {
                    city: this.context.locations[i].city,
                    state_province: this.context.locations[i].state_province,
                    country: this.context.locations[i].country
                }
            }
        }

        const routeDest = this.context.destinations.filter(function(dest) {
                return dest.route_id === parseInt(routeID)
        })

        const destinations = routeDest.map(dest =>
            <Destination
                className='Destination'
                key={dest.id}
                name={dest.destination}
                content={dest.content}
                destLat={dest.destLat}
                destLng={dest.destLng}
                seqNum={dest.sequence_num}
                routeID={dest.route_id}
            />
        )

        return (
            <section className="RoutePage">
                <h3>{route.name}</h3>
                <span>{location.city}, {location.state_province}</span>
                <div className='Image'>[image]</div>
                <button>Start Route</button>
                <div className='DestinationList'>
                   {destinations}
                </div>
            </section>
        )
    };
}

export default RoutePage;