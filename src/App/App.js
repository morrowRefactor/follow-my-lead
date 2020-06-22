import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Homepage from '../Homepage/Homepage';
import BrowseRoutes from '../BrowseRoutes/BrowseRoutes';
import RoutePage from '../RoutePage/RoutePage';
import CreateRoute from '../CreateRoute/CreateRoute';
import AddDestination from '../AddDestination/AddDestination';
import EditRoute from '../EditRoute/EditRoute';
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
    this.setState({
      routeTypes: DummyStore.routeTypes,
      locations: DummyStore.locations,
      routes: DummyStore.routes,
      destinations: DummyStore.destinations
    })
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

  addLocation = location => {
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

  addressTransfer = addy => {
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
      addressTransfer: this.addressTransfer,
      setDestinations: this.setDestinations,
      deleteRoute: this.deleteRoute,
      updateRoute: this.updateRoute,
      updateLocation: this.updateLocation
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
