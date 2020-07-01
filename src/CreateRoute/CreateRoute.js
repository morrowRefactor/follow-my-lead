import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ICountry from 'country-state-city/lib/country.json';
import IState from 'country-state-city/lib/state.json';
import ICity from 'country-state-city/lib/city.json';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import config from '../config';
import './CreateRoute.css';

class CreateRoute extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props);
        this.state = {
            name: { value: '', touched: false },
            routeType: { value: '', touched: false },
            routeSumm: { value: '', touched: false },
            city: { value: '', touched: false },
            state_province: { id: '', value: '', touched: false },
            country: { id: '', value: '', touched: false }
        }
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }

    updateRouteType(routeType) {
        this.setState({routeType: {value: routeType, touched: true}});
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

        const countryObj = ICountry.filter(obj => {
            return obj.id === this.state.country.value
        })
        const stateObj = IState.filter(obj => {
            return obj.id === this.state.state_province.value
        })
        const cityObj = ICity.filter(obj => {
            return obj.id === this.state.city.value
        })
        
        const uniqueLocString = `${cityObj[0].name}` + '-' + `${stateObj[0].name}` + '-' + `${countryObj[0].name}`;
        const uniqueLocClean = uniqueLocString.replace(/\s/g , "-");

        const input = {
            name: this.state.name.value,
            routeType: this.state.routeType.value,
            routeSumm: this.state.routeSumm.value,
            city: cityObj[0].name,
            state_province: stateObj[0].name,
            country: countryObj[0].name,
            unique_loc: uniqueLocClean
        }

        let newLocation = {};
        let newRoute = {};
        const routeTypeObj = this.context.routeTypes.filter(obj => {
            return obj.route_type === input.routeType
        })
        const checkLocation = this.context.locations.find(loc => loc.unique_loc === input.unique_loc);
        
        if(checkLocation) {
            newRoute = {
                route_name: input.name,
                route_summ: input.routeSumm,
                route_type_id: routeTypeObj[0].id,
                location_id: checkLocation.id
            };
            this.handleUpdateRoute(newRoute);
        } else {
            newLocation = {
                city: input.city,
                state_province: input.state_province,
                country: input.country,
                unique_loc: input.unique_loc
            };
            newRoute = {
                route_name: input.name,
                route_summ: input.routeSumm,
                route_type_id: routeTypeObj[0].id
            };
            this.handleUpdateLocation(newLocation, newRoute);
        }
    };
    
    handleUpdateLocation(newLocation, newRoute) {
        fetch(`${config.API_ENDPOINT}/api/locations`, {
          method: 'POST',
          body: JSON.stringify(newLocation),
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
            this.handleUpdateRoute(newRoute, data.id)
          })
          .catch(error => {
            this.setState({ error })
        })
    }

    handleUpdateRoute(newRoute, locID) {
        if(locID) {
            newRoute.location_id = locID;
        }

        fetch(`${config.API_ENDPOINT}/api/routes`, {
          method: 'POST',
          body: JSON.stringify(newRoute),
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
            this.context.addRoute(data)
            this.props.history.push(`/create-route/add-destinations/${data.id}`);
          })
          .catch(error => {
            this.setState({ error })
          })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        const nameError = this.validateName();
        const routeSummError = this.validateRouteSumm();
        const routeTypes = this.context.routeTypes;
        const stateArray = IState.filter(obj => {
            return obj.country_id === this.state.country.value
        });
        const cityArray = ICity.filter(obj => {
            return obj.state_id === this.state.state_province.value
        });

        return (
            <section className="CreateRoute">
                <h3>Create a Custom Route</h3>
                <form 
                    className='CreateRouteForm'
                    onSubmit={e => this.handleSubmit(e)}
                >
                    <div>
                        <label htmlFor='routeName'>
                            Route Name
                        </label>
                        <input 
                            type='text'
                            name='name'
                            id='name'
                            defaultValue='My New Route'
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
                            onChange={e => this.updateRouteType(e.target.value)}
                            required
                        >
                            <option value=''>Select</option>
                            {routeTypes.map(type =>
                                <option value={type.route_type} key={type.id}>
                                    {type.route_type}
                                </option>
                            )}
                        </select>
                        <label htmlFor='routeSumm'>
                            Route Summary
                        </label>
                        <input 
                            type='text'
                            name='summary'
                            id='summary'
                            defaultValue='Enter a brief summary of your route'
                            onChange={e => this.updateRouteSumm(e.target.value)}
                            required
                        />
                        {this.state.routeSumm.touched && (
                            <ValidationError message={routeSummError} />
                        )}
                        <label htmlFor='country'>
                            Country
                        </label>
                        <select
                            name='country'
                            id='country'
                            onChange={e => this.updateCountry(e.target.value)}
                            required
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
                            onChange={e => this.updateStateProvince(e.target.value)}
                            required
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
                            onChange={e => this.updateCity(e.target.value)}
                            required
                        >
                            <option value=''>Select</option>
                            {cityArray.map(city =>
                                <option value={city.id} key={parseInt(city.id)}>
                                    {city.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className='CreateRouteButtons'>
                        <button type='submit'>
                            Save
                        </button>
                        {' '}
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        )
    };
}

export default withRouter(CreateRoute);