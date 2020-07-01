import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RouteSummary from '../RouteSummary/RouteSummary';
import APIContext from '../APIContext';
import './BrowseRoutes.css';

class BrowseRoutes extends Component {
    static contextType = APIContext;

    handleFilter = type => {
        this.props.history.push(`/browse-routes/${type}`)
    };


    render() {
        const routeFilter = this.props.location.pathname;

        const routeTypes = this.context.routes.filter(function(routes) {
            if(routeFilter.includes('tourist')) {
                return routes.route_type_id === 1
            }
            else if(routeFilter.includes('historic')) {
                return routes.route_type_id === 2
            }
            else if(routeFilter.includes('personal')) {
                return routes.route_type_id === 3
            }
            else {
                return this.context.routes
            }
        }) 

        const routes = routeTypes.map(route =>
            <RouteSummary
                className='RouteSummary'
                key={route.id}
                routeID={route.id}
                routeName={route.route_name}
                routeSumm={route.route_summ}
                locationID={route.route_location}
                routeType={route.route_type_id}
            />
        );

        return (
            <section className="BrowseRoutes">
                <h2>Browse categories to find routes suited to your interests</h2>
                <div className='Filters'>
                    <button onClick={() => this.handleFilter()}>All</button>
                    <button onClick={() => this.handleFilter('tourist')}>Tourist Guides</button>
                    <button onClick={() => this.handleFilter('historic')}>Historical</button>
                    <button onClick={() => this.handleFilter('personal')}>Personal</button>
                </div>
                <div className='Routes'>
                   {routes} 
                </div>
            </section>
        )
    };
}

export default withRouter(BrowseRoutes);