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
            country: { id: '', value: '', touched: false }
        }
    }

    updateName(name) {
        console.log('updatename')
        this.setState({name: {value: name, touched: true}});
    }

    updateRouteType(routeType) {
        console.log('updateroutetype')
        this.setState({routeType: {value: routeType, touched: true}});
    }

    updateRouteSumm(routeSumm) {
        console.log('updateroutesumm')
        this.setState({routeSumm: {value: routeSumm, touched: true}});
    }

    updateCountry(country) {
        console.log('updatecountry')
        this.setState({country: {value: country, touched: true}});
    }

    updateStateProvince(stateProvince) {
        console.log('updatestate')
        this.setState({state_province: {value: stateProvince, touched: true}});
    }

    updateCity(city) {
        console.log('updatecity')
        this.setState({city: {value: city, touched: true}});
    }

    validateName() {
        console.log('validatename')
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'A route name is required';
        }
    }

    validateRouteSumm() {
        console.log('validateroutesumm')
        const routeSumm = this.state.routeSumm.value.trim();
        if (routeSumm.length === 0) {
          return 'A route summary is required';
        }
    }

    validateInput = e => {
        e.preventDefault();
        const routeID = this.props.match.params.route_id;
        const routeObj = this.context.routes.filter(obj => {
            return obj.id === parseInt(routeID)
        })
        const routeTypeObj = this.context.routeTypes.filter(obj => {
            return obj.type === document.getElementById('routeType').value
        })
        const input = {
            routeID: parseInt(routeID),
            route_name: this.state.name.value,
            route_type_id: routeTypeObj[0].id,
            route_summ: this.state.routeSumm.value,
            city: this.state.city.value,
            state_province: this.state.state_province.value,
            country: this.state.country.value
        }

        if(this.state.country.touched === true || this.state.state_province.touched === true || this.state.city.touched === true) {
            console.log('location edited')
        }
        else {
            console.log('location not edited')
        }
    };

    handleSubmit(input) {
        const newRoute = {
            id: input.routeID,
            route_name: input.name,
            route_summ: input.routeSumm,
            route_type_id: input.routeType,
            route_location: input.locID
        }
        const newLocation = {
            id: input.locID,
            city: input.city,
            state_province: input.province,
            country: input.country
        }
        
        this.context.updateLocation(newLocation);
        this.context.updateRoute(newRoute);
        this.props.history.push('/');
    }

    handleClickCancel = () => {
        console.log('handlecancel')
        const routeID = this.props.match.params.route_id;
        this.props.history.push(`/routes/${parseInt(routeID)}`);
    }

    handleDeleteRoute = id => {
        console.log('handledelete')
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
              this.context.handleDelete();
            })
            .catch(error => {
              this.setState({ error })
        })
        this.props.history.push('/browse-routes');
    }

    render() {
        const nameError = this.validateName();
        const routeSummError = this.validateRouteSumm();
        const stateArray = IState.filter(obj => {
            return obj.country_id === this.state.country.value
        });
        const cityArray = ICity.filter(obj => {
            return obj.state_id === this.state.state_province.value
        });

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

        return (
            <section className="EditRoute">
                <h3>Edit Route</h3>
                <form 
                    className='CreateRouteForm'
                    onSubmit={() => this.validateInput()}
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
                            {this.context.routeTypes.map(type =>
                                <option 
                                    value={type.route_type} 
                                    key={type.id} 
                                    defaultValue={routeType}
                                    onChange={e => this.updateRouteType(e.target.value)}
                                >
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
                            defaultValue={routeToEdit.route_summ}
                            onChange={e => this.updateRouteSumm(e.target.value)}
                            required
                        />
                        {this.state.routeSumm.touched && (
                            <ValidationError message={routeSummError} />
                        )}
                        <div className='CurrentLocation'>
                            <h4>Current Route Location</h4>
                            City: {routeLocation.city}<br/>
                            State/Province: {routeLocation.state_province}<br/>
                            Country: {routeLocation.country}<br/>
                        </div>
                        <div className={this.state.locForm}>
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
                    <div className='CreateRouteButtons'>
                        <button type='submit'>
                            Save Changes
                        </button>
                        {' '}
                        <button type='button' onClick={() => this.handleClickCancel()}>
                            Cancel
                        </button>
                        {' '}
                        <button type='button' onClick={() => this.handleDeleteRoute(parseInt(this.props.match.params.route_id))}>
                            Delete Route
                        </button>
                    </div>
                </form>
            </section>
        )
    };
}

export default withRouter(EditRoute);