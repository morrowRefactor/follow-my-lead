import React from 'react';

export default React.createContext({
    routeTypes: [],
    locations: [],
    routes: [],
    destinations: [],
    selectedAddyAddDest: {},
    selectedAddyEditDest: {},
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
    addyTransferAddDest: () => {},
    addyTransferEditDest: () => {}
})