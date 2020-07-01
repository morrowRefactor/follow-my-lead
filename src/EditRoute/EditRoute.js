import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIContext from '../APIContext';
import './EditRoute.css';

class EditRoute extends Component {
    static contextType = APIContext;

    validateInput = e => {
        e.preventDefault();
        const routeID = this.props.match.params.route_id;
        const randLocID = Math.floor((Math.random() * 1000) + 1);
        const routeObj = this.context.routes.filter(obj => {
            return obj.id === parseInt(routeID)
        })
        const routeTypeObj = this.context.routeTypes.filter(obj => {
            return obj.type === document.getElementById('routeType').value
        })
        const input = {
            routeID: parseInt(routeID),
            name: document.getElementById('name').value,
            routeType: routeTypeObj[0].id,
            routeSumm: document.getElementById('summary').value,
            locID: randLocID,
            city: document.getElementById('city').value,
            province: document.getElementById('state_province').value,
            country: document.getElementById('country').value
        }

        this.handleSubmit(input)
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
        const routeID = this.props.match.params.route_id;
        this.props.history.push(`/routes/${parseInt(routeID)}`);
    }

    handleRouteDelete = id => {
        this.context.deleteRoute(id);
        this.props.history.push('/');
    }

    render() {
        let routeToEdit = {};
        let routeLocation = {};
        const routeID = this.props.match.params.route_id;
        for(let i = 0; i < this.context.routes.length; i++) {
            if (this.context.routes[i].id === parseInt(routeID)) {
                routeToEdit = {
                    routeName: this.context.routes[i].route_name,
                    routeSumm: this.context.routes[i].route_summ,
                    location: this.context.routes[i].route_location,
                    routeType: this.context.routes[i].route_type_id
                }
            }
        }
        for(let i = 0; i < this.context.locations.length; i++) {
            if(this.context.locations[i].id === routeToEdit.location) {
                routeLocation = {
                    id: this.context.locations[i].id,
                    city: this.context.locations[i].city,
                    state_province: this.context.locations[i].state_province,
                    country: this.context.locations[i].country
                }
            }
        }
        const routeTypes = this.context.routeTypes;

        return (
            <section className="EditRoute">
                <h3>Edit Route</h3>
                <form 
                    className='CreateRouteForm'
                    onSubmit={this.validateInput}
                >
                    <div>
                        <label htmlFor='routeName'>
                            Route Name
                        </label>
                        <input 
                            type='text'
                            name='name'
                            id='name'
                            placeholder={routeToEdit.routeName}
                            required
                        />
                        <label htmlFor='routeType'>
                            Type of Route
                        </label>
                        <select
                            name='routeType'
                            id='routeType'
                            required
                        >
                            {routeTypes.map(type =>
                                <option value={type.type} key={type.id}>
                                    {type.type}
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
                            placeholder={routeToEdit.routeSumm}
                            required
                        />
                        <label htmlFor='city'>
                            City
                        </label>
                        <input 
                            type='text'
                            name='city'
                            id='city'
                            placeholder={routeLocation.city}
                            required
                        />
                        <label htmlFor='state_province'>
                            State/Province
                        </label>
                        <input 
                            type='text'
                            name='state_province'
                            id='state_province'
                            placeholder={routeLocation.state_province}
                            required
                        />
                        <label htmlFor='country'>
                            Country
                        </label>
                        <input 
                            type='text'
                            name='country'
                            id='country'
                            placeholder={routeLocation.country}
                            required
                        />
                    </div>
                    <div className='CreateRouteButtons'>
                        <button type='submit'>
                            Save Changes
                        </button>
                        {' '}
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        {' '}
                        <button type='button' onClick={() => this.handleRouteDelete(parseInt(routeID))}>
                            Delete Route
                        </button>
                    </div>
                </form>
            </section>
        )
    };
}

export default withRouter(EditRoute);