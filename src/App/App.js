import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Homepage from '../Homepage/Homepage';
import BrowseRoutes from '../BrowseRoutes/BrowseRoutes';
import RoutePage from '../RoutePage/RoutePage';
import CreateRoute from '../CreateRoute/CreateRoute';
import AddDestination from '../AddDestination/AddDestination';
import EditRoute from '../EditRoute/EditRoute';
import EditDestination from '../Edit Destination/EditDestination';
import APIContext from '../APIContext';
import DummyStore from '../dummy-store';
import config from '../config';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routeTypes: [],
      locations: [],
      routes: [],
      destinations: [],
      selectedAddress: {},
      selectedDestLat: 1,
      selectedDestLng: 1,
      navbar: 'hidden'
    };
  }

  updateState = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/locations`),
      fetch(`${config.API_ENDPOINT}/api/route-types`),
      fetch(`${config.API_ENDPOINT}/api/routes`),
      fetch(`${config.API_ENDPOINT}/api/destinations`)
  ])
      .then(([locRes, routeTypeRes, routesRes, destRes]) => {
          if (!locRes.ok)
              return locRes.json().then(e => Promise.reject(e));
          if (!routeTypeRes.ok)
              return routeTypeRes.json().then(e => Promise.reject(e));
          if (!routesRes.ok)
              return routesRes.json().then(e => Promise.reject(e));
          if (!destRes.ok)
              return destRes.json().then(e => Promise.reject(e));
          return Promise.all([locRes.json(), routeTypeRes.json(), routesRes.json(), destRes.json()]);
      })
      .then(([locations, routeTypes, routes, destinations]) => {
          this.setState({
              locations: locations, 
              routeTypes: routeTypes,
              routes: routes,
              destinations: destinations
            });
      })
      .catch(error => {
          console.error({error});
      });
  }

  componentDidMount() {
      this.updateState();
  }

  toggleNav = () => {
    const css = (this.state.navbar === 'hidden') ? 'show' : 'hidden';
    this.setState({
      navbar: css
    })
  }

  setRoutes = routes => {
    this.setState({
      routes: routes
    });
  }

  setDestinations = dest => {
    this.setState({
      destinations: dest
    });
  }

  addLocation = (location) => {
    const newLocation = this.state.locations;
    newLocation.push(location);
    this.setState({
      locations: newLocation
    })
  }

  addRoute = route => {
    const newRoute = this.state.routes;
    newRoute.push(route);
    this.setState({
      routes: newRoute
    })
  }

  addDest = dest => {
    const newDest = this.state.destinations;
    newDest.push(dest);
    this.setState({
      destinations: newDest
    })
  }

  addyTransfer = addy => {
    this.setState({
      selectedAddress: addy
    })
  }

  updateRoute = route => {
    const updateRoutes = this.state.routes.filter(obj => {
      return obj.id !== route.id
    });
    updateRoutes.push(route);
    this.setState({
      routes: updateRoutes
    })
  }

  updateLocation = loc => {
    const newLoc = this.state.locations;
    newLoc.push(loc);
    this.setState({
      locations: newLoc
    })
  }

  deleteRoute = id => {
    const newRoutes = this.state.routes.filter(obj => {
      return obj.id !== id
    });
    this.setState({
      routes: newRoutes
    })
  }

  render() {
    const value = {
      routeTypes: this.state.routeTypes,
      locations: this.state.locations,
      routes: this.state.routes,
      destinations: this.state.destinations,
      selectedAddress: this.state.selectedAddress,
      selectedDestLat: this.state.selectedDestLat,
      selectedDestLng: this.context.selectedDestLng,
      navbar: this.state.navbar,
      toggleNav: this.toggleNav,
      setRoutes: this.setRoutes,
      addRoute: this.addRoute,
      addLocation: this.addLocation,
      addDest: this.addDest,
      setDestinations: this.setDestinations,
      deleteRoute: this.deleteRoute,
      updateRoute: this.updateRoute,
      updateLocation: this.updateLocation,
      addyTransfer: this.addyTransfer
    }

    return (
      <APIContext.Provider value={value}>
        <div className="App">
          <NavBar />
          <Route
            path={['/browse-routes', '/browse-routes/:type']}
            component={BrowseRoutes}
          />
          <Route 
            path='/routes/:route_id'
            component={RoutePage}
          />
          <Route
            exact
            path='/create-route'
            component={CreateRoute}
          />
          <Route
            exact
            path='/edit-route/:route_id'
            component={EditRoute}
          />
          <Route
            exact
            path='/edit-destination/:dest_id'
            component={EditDestination}
          />
          <Route
            path={['/create-route/add-destinations/:route_id', '/create-route/add-destinations']}
            component={AddDestination}
          />
          <Route 
            exact
            path='/'
            component={Homepage}
          />
        </div>
      </APIContext.Provider>
    )
  };
}

export default App;
