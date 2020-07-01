import React from 'react';

export default React.createContext({
    routeTypes: [],
    locations: [],
    routes: [],
    destinations: [],
    selectedAddress: {},
    selectedDestLat: 1,
    selectedDestLng: 1,
    navbar: '',
    toggleNav: () => {},
    setRoutes: () => {},
    addRoute: () => {},
    addLocation: () => {},
    addDest: () => {},
    setDestinations: () => {},
    deleteRoute: () => {},
    updateRoute: () => {},
    updateLocation: () => {},
    addyTransfer: () => {}
})