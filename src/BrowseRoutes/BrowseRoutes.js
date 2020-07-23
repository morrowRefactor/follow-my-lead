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
        const allRoutes = this.context.routes;

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
                return allRoutes
            }
        }) 

        const routes = routeTypes.map(route =>
            <RouteSummary
                className='RouteSummary'
                key={route.id}
                routeID={route.id}
                routeName={route.route_name}
                routeSumm={route.route_summ}
                locationID={route.location_id}
                routeType={route.route_type_id}
            />
        );

        return (
            <section className="BrowseRoutes">
                <section className='BrowseRoutes_nav'>
                    <h2 className='browseRoutesTitle'>Browse routes created by fellow adventurers and find truly unique experiences</h2>
                    <h3 className='browseRoutesSubTitle'>Flip through the full scope of available routes or sort by a category that suites your interest.</h3>
                    <div className='BrowseRoutes_filters'>
                        <button className='browseRouteButton' onClick={() => this.handleFilter()}>All</button>
                        <button className='browseRouteButton' onClick={() => this.handleFilter('tourist')}>Tourist</button>
                        <button className='browseRouteButton' onClick={() => this.handleFilter('historic')}>Historic</button>
                        <button className='browseRouteButton' onClick={() => this.handleFilter('personal')}>Personal</button>
                    </div>
                </section>
                <div className='BrowseRoutes_routes'>
                   {routes} 
                </div>
            </section>
        )
    };
}

export default withRouter(BrowseRoutes);