import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIContext from '../APIContext';
import './CreateRoute.css';

class CreateRoute extends Component {
    static contextType = APIContext;

    validateInput = e => {
        e.preventDefault();
        const input = {
            name: document.getElementById('name').value,
            routeType: document.getElementById('routeType').value,
            routeSumm: document.getElementById('summary').value,
            city: document.getElementById('city').value,
            province: document.getElementById('state_province').value,
            country: document.getElementById('country').value
        }

       this.handleSubmit(input);
    };

    handleSubmit(input) {
        const randLocID = Math.floor((Math.random() * 1000) + 1);
        const newLocation = {
            id: randLocID,
            city: input.city,
            state_province: input.state_province,
            country: input.country
        }
        let routeID = 0;
        for(let i = 0; i < this.context.routeTypes.length; i++) {
            if(this.context.routeTypes[i].type === input.routeType) {
                routeID = this.context.routeTypes[i].id;
            }
        }
        const randRouteID = Math.floor((Math.random() * 1000) + 1);
        const newRoute = {
            id: randRouteID,
            route_name: input.name,
            route_summ: input.routeSumm,
            route_type_id: routeID,
            route_location: randLocID
        }
        
        this.context.addLocation(newLocation);
        this.context.addRoute(newRoute);
        this.props.history.push(`/create-route/add-destinations/${randRouteID}`);
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        const routeTypes = this.context.routeTypes;

        return (
            <section className="CreateRoute">
                <h3>Create a Custom Route</h3>
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
                            placeholder='My New Route'
                            required
                        />
                        <div 
                            className="errorMessage"  
                            id="nameError">
                            Please enter a valid route name
                        </div>
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
                            placeholder='Enter a brief summary of your route'
                            required
                        />
                        <label htmlFor='city'>
                            City
                        </label>
                        <input 
                            type='text'
                            name='city'
                            id='city'
                            placeholder='New York'
                            required
                        />
                        <label htmlFor='state_province'>
                            State/Province
                        </label>
                        <input 
                            type='text'
                            name='state_province'
                            id='state_province'
                            placeholder='New York'
                            required
                        />
                        <label htmlFor='country'>
                            Country
                        </label>
                        <input 
                            type='text'
                            name='country'
                            id='country'
                            placeholder='United States'
                            required
                        />
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