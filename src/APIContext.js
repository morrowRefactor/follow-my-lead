import React from 'react';

export default React.createContext({
    routeTypes: [],
    locations: [],
    routes: [],
    destinations: [],
    selectedAddress: {},
    selectedAddress2: {},
    selectedDestLat: 1,
    selectedDestLng: 1,
    navbar: '',
    toggleNav: () => {},
    setRoutes: () => {},
    addRoute: () => {},
    addLocation: () => {},
    addDest: () => {},
    setDestinations: () => {},
    handlePatchDelete: () => {},
    updateRoute: () => {},
    updateLocation: () => {},
    addyTransfer: () => {},
    addyTransfer2: () => {}
})