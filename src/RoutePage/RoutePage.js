import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Destination from '../Destination/Destination';
import APIContext from '../APIContext';
import './RoutePage.css';

class RoutePage extends Component {
    static contextType = APIContext;

    handleEditRoute = id => {
        this.props.history.push(`/edit-route/${id}`);
    };

    handleAddDest = id => {
        this.props.history.push(`/create-route/add-destinations/${id}`);
    };

    render() {
        // pull all the route info to populate the page based on the route ID
        let routeID = this.props.match.params.route_id;

        let route = {
            name: '',
            route_summ: '',
            routeType: 0,
            location: 0
        };

        let location = {
            city: '',
            state_province: '',
            country: ''
        };

        for(let i = 0; i < this.context.routes.length; i++) {
            if(this.context.routes[i].id === parseInt(routeID)) {
                route = {
                    name: this.context.routes[i].route_name,
                    route_summ: this.context.routes[i].route_summ,
                    routeType: this.context.routes[i].route_type_id,
                    location: this.context.routes[i].location_id
                };
            };
        };

        for(let i = 0; i < this.context.locations.length; i++) {
            if(this.context.locations[i].id === route.location) {
                location = {
                    city: this.context.locations[i].city,
                    state_province: this.context.locations[i].state_province,
                    country: this.context.locations[i].country
                };
            };
        };

        // order destinations ascending
        const routeDest = this.context.destinations.filter(function(dest) {
                return dest.route_id === parseInt(routeID);
        });
        routeDest.sort((a, b) => {
            return a.sequence_num - b.sequence_num;
        });

        const destinations = routeDest.map(dest =>
            <Destination
                className='Destination'
                key={dest.id}
                destID={dest.id}
                name={dest.destination}
                content={dest.content}
                placeID={dest.place_id}
                formAddress={dest.formatted_address}
                destLat={Number(dest.dest_lat)}
                destLng={Number(dest.dest_lng)}
                seqNum={dest.sequence_num}
                routeID={dest.route_id}
            />
        );
        
        // use preset images based on route type
        let routeImage = '';
        if(route.routeType === 1) {
            routeImage = 'https://user-images.githubusercontent.com/58446465/87073383-d5c3da80-c20c-11ea-981a-1785988fcbeb.jpg';
        };
        if(route.routeType === 2) {
            routeImage = 'https://user-images.githubusercontent.com/58446465/87073369-d0669000-c20c-11ea-8e75-5f48a0f9aea3.jpg';
        };
        if(route.routeType === 3) {
            routeImage = 'https://user-images.githubusercontent.com/58446465/87073376-d3618080-c20c-11ea-9f06-1a89131e441c.jpg';
        };

        return (
            <section className="RoutePage">
                <div className='RoutePage_routeOverview'>
                    <img className='routePageImage featureImage' src={routeImage} alt={route.name}/>
                    <h3 className='routePageTitle'>{route.name}</h3>
                    <div className='routePageEditLinks'><button className='routePageEditButton' onClick={() => this.handleEditRoute(parseInt(routeID))}>Edit Route</button>  |  <button className='routePageEditButton' onClick={() => this.handleAddDest(parseInt(routeID))}>Add Destinations</button></div>
                    <p className='routePagePerts'>{location.city}, {location.state_province}<br/>{routeDest.length} stops on this route</p>
                    <p className='routePageContent'>{route.route_summ}</p>
                </div>
                <div className='RoutePage_destinationList'>
                    {destinations}
                </div>
            </section> 
        );
    };
};

export default withRouter(RoutePage);