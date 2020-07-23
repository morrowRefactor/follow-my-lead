import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import ICountry from 'country-state-city/lib/country.json';
import IState from 'country-state-city/lib/state.json';
import ICity from 'country-state-city/lib/city.json';
import APIContext from '../APIContext';
import config from '../config';
import './EditRoute.css';

class EditRoute extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props);
        this.state = {
            name: { value: '', touched: false },
            routeType: { value: '', touched: false },
            routeSumm: { value: '', touched: false },
            city: { value: '', touched: false },
            state_province: { value: '', touched: false },
            country: { value: '', touched: false },
            locationForm: 'hidden'
        }
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }

    updateRouteSumm(routeSumm) {
        this.setState({routeSumm: {value: routeSumm, touched: true}});
    }

    updateCountry(country) {
        this.setState({country: {value: country, touched: true}});
    }

    updateStateProvince(stateProvince) {
        this.setState({state_province: {value: stateProvince, touched: true}});
    }

    updateCity(city) {
        this.setState({city: {value: city, touched: true}});
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'A route name is required';
        }
    }

    validateRouteSumm() {
        const routeSumm = this.state.routeSumm.value.trim();
        if (routeSumm.length === 0) {
          return 'A route summary is required';
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        let routeTypeID = 0;
        for(let i = 0; i < this.context.routeTypes.length; i++) {
            if(this.context.routeTypes[i].route_type === document.getElementById('routeType').value) {
                routeTypeID = this.context.routeTypes[i].id;
            }
        }

        const route = {
            route_name: this.state.name.value,
            route_type_id: routeTypeID,
            route_summ: this.state.routeSumm.value
        }

        if(this.state.country.touched === true || this.state.state_province.touched === true || this.state.city.touched === true) {
            const countryObj = ICountry.filter(obj => {
                return obj.id === this.state.country.value
            })
    
            const stateObj = IState.filter(obj => {
                return obj.id === this.state.state_province.value
            })
    
            const cityObj = ICity.filter(obj => {
                return obj.id === this.state.city.value
            })
    
            const uniqueLocString = `${cityObj[0].name}-${stateObj[0].name}-${countryObj[0].name}`;
            const uniqueLocClean = uniqueLocString.replace(/\s/g , "-");
    
            const loc = {
                city: cityObj[0].name,
                state_province: stateObj[0].name,
                country: countryObj[0].name,
                unique_loc: uniqueLocClean
            }

            let newLocation = true;
            for(let i = 0; i < this.context.locations.length; i++) {
                if(this.context.locations[i].unique_loc === uniqueLocClean) {
                    newLocation = false;
                    route.location_id = this.context.locations[i].id;
                    this.handleUpdateRoute(route);
                }
            }
            if(newLocation === true) {
                this.handleUpdateLocation(loc, route);
            }
        }
        else {
            let locID = 0;
            for(let i = 0; i < this.context.routes.length; i++) {
                if(this.context.routes[i].id === parseInt(this.props.match.params.route_id)) {
                    locID = this.context.routes[i].location_id;
                }
            }
            route.location_id = locID;
            this.handleUpdateRoute(route);
        }
    };

    handleUpdateLocation(loc, route) {
        fetch(`${config.API_ENDPOINT}/api/locations`, {
          method: 'POST',
          body: JSON.stringify(loc),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            if (!res.ok) {
              return res.json().then(error => {
                throw error
              })
            }
            return res.json()
          })
          .then(data => {
            this.context.addLocation(data)
            this.handleUpdateRoute(route, data.id)
          })
          .catch(error => {
            this.setState({ error })
        })
    }

    handleUpdateRoute = (route, locID) => {
        const currRouteVals = this.context.routes.filter(obj => {
            return obj.id === parseInt(this.props.match.params.route_id)
        })
        
        if(locID) {
            route.location_id = locID;
        }
        if(route.route_name.length < 1) {
            route.route_name = currRouteVals[0].route_name
        }
        if(route.route_summ.length < 1) {
            route.route_summ = currRouteVals[0].route_summ
        }
        if(route.route_type_id === 0) {
            route.route_type_id = currRouteVals[0].route_type_id
        }

        fetch(`${config.API_ENDPOINT}/api/routes/${this.props.match.params.route_id}`, {
            method: 'PATCH',
            body: JSON.stringify(route),
            headers: {
              'content-type': 'application/json'
            }
          })
            .then(res => {
              if (!res.ok) {
                return res.json().then(error => {
                  throw error
                })
              }
            })
            .then(data => {
              this.context.handlePatchDelete();
            })
            .catch(error => {
              this.setState({ error })
            })
        this.props.history.push(`/routes/${this.props.match.params.route_id}`);
    }

    handleClickCancel = () => {
        const routeID = this.props.match.params.route_id;
        this.props.history.push(`/routes/${parseInt(routeID)}`);
    }

    handleDeleteRoute = id => {
        fetch(`${config.API_ENDPOINT}/api/routes/${id}`, {
            method: 'DELETE',
            body: JSON.stringify(id),
            headers: {
              'content-type': 'application/json'
            }
          })
            .then(res => {
              if (!res.ok) {
                return res.json().then(error => {
                  throw error
                })
              }
            })
            .then(data => {
              this.context.handlePatchDelete();
            })
            .catch(error => {
              this.setState({ error })
        })
        this.props.history.push('/browse-routes');
    }

    handleShowLocForm = () => {
        const css = (this.state.locationForm === 'hidden') ? 'EditRoute_locationForm' : 'hidden';
        this.setState({
            locationForm: css
        })
    }

    render() {
        const nameError = this.validateName();
        const routeSummError = this.validateRouteSumm();

        let routeToEdit = {};
        for(let i = 0; i < this.context.routes.length; i++) {
            if (this.context.routes[i].id === parseInt(this.props.match.params.route_id)) {
                routeToEdit = this.context.routes[i];
            }
        }

        let routeLocation = {};
        for(let i = 0; i < this.context.locations.length; i++) {
            if(this.context.locations[i].id === routeToEdit.location_id) {
                routeLocation = this.context.locations[i];
            }
        }

        let routeType = '';
        for(let i = 0; i < this.context.routeTypes.length; i++) {
            if(this.context.routeTypes[i].id === routeToEdit.route_type_id) {
                routeType = this.context.routeTypes[i].route_type;
            }
        }

        const stateArray = IState.filter(obj => {
            return obj.country_id === this.state.country.value
        });

        const cityArray = ICity.filter(obj => {
            return obj.state_id === this.state.state_province.value
        }); 

        return (
            <section className="EditRoute featureBox">
                <h3 className='editRouteTitle'>Edit Route</h3>
                <p className='editRouteSubTitle'>{routeToEdit.route_name}</p>
                <form 
                    className='EditRoute_editRouteForm'
                >
                    <div>
                        <label htmlFor='routeName'>
                            Route Name
                        </label>
                        <input 
                            type='text'
                            name='name'
                            id='name'
                            defaultValue={routeToEdit.route_name}
                            onChange={e => this.updateName(e.target.value)}
                            required
                        />
                        {this.state.name.touched && (
                            <ValidationError message={nameError} />
                        )}
                        <label htmlFor='routeType'>
                            Type of Route
                        </label>
                        <select
                            name='routeType'
                            id='routeType'
                            required
                        >
                            <option>Select</option>
                            {this.context.routeTypes.map(type =>
                                <option 
                                    value={type.route_type} 
                                    key={type.id}
                                    defaultValue={routeType}
                                >
                                    {type.route_type}
                                </option>
                            )}
                        </select>
                        <label htmlFor='routeSumm'>
                            Route Summary
                        </label>
                        <textarea 
                            type='text'
                            name='summary'
                            id='summary'
                            defaultValue={routeToEdit.route_summ}
                            onChange={e => this.updateRouteSumm(e.target.value)}
                            required
                        />
                        {this.state.routeSumm.touched && (
                            <ValidationError message={routeSummError} />
                        )}
                        <div className='EditRoute_currentLoc'>
                            <strong>Current Location:</strong><br/>
                            <i>City:</i> {routeLocation.city}<br/>
                            <i>State/Province:</i> {routeLocation.state_province}<br/>
                            <i>Country:</i> {routeLocation.country}<br/>
                            <button className='showLocForm' onClick={() => this.handleShowLocForm()}>Change</button>
                        </div>
                        <div className={this.state.locationForm}>
                            <label htmlFor='country'>
                                Country
                            </label>
                            <select
                                    name='country'
                                    id='country'
                                    defaultValue={routeLocation.country}
                                    onChange={e => this.updateCountry(e.target.value)}
                                >
                                    <option value=''>Select</option>
                                    {ICountry.map(country =>
                                        <option value={country.id} key={parseInt(country.id)}>
                                            {country.name}
                                        </option>
                                    )}
                                </select>
                            <label htmlFor='state_province'>
                                State/Province
                            </label>
                            <select
                                    name='state_province'
                                    id='state_province'
                                    disabled={!this.state.country.touched}
                                    defaultValue={routeLocation.state_province}
                                    onChange={e => this.updateStateProvince(e.target.value)}
                                >
                                    <option value=''>Select</option>
                                    {stateArray.map(prov =>
                                        <option value={prov.id} key={parseInt(prov.id)}>
                                            {prov.name}
                                        </option>
                                    )}
                                </select>
                            <label htmlFor='city'>
                                City
                            </label>
                            <select
                                    name='city'
                                    id='city'
                                    disabled={!this.state.state_province.touched}
                                    defaultValue={routeLocation.city}
                                    onChange={e => this.updateCity(e.target.value)}
                                >
                                    <option value=''>Select</option>
                                    {cityArray.map(city =>
                                        <option value={city.id} key={parseInt(city.id)}>
                                            {city.name}
                                        </option>
                                    )}
                            </select>
                        </div>
                    </div>
                    <div className='EditRoute_formButtons'>
                        <button className='editRouteButton' type='button' onClick={e => this.handleSubmit(e)}>
                            Save Changes
                        </button>
                        {' '}
                        <button className='editRouteButton' type='button' onClick={() => this.handleClickCancel()}>
                            Cancel
                        </button>
                        {' '}
                        <button className='editRouteButton' type='button' onClick={() => this.handleDeleteRoute(parseInt(this.props.match.params.route_id))}>
                            Delete Route
                        </button>
                    </div>
                </form>
            </section>
        )
    };
}

export default withRouter(EditRoute);