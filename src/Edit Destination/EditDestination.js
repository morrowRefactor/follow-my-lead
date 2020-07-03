import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIContext from '../APIContext';
import config from '../config';
import './EditDestination.css';

class EditDestination extends Component {
    static contextType = APIContext;

    validateInput = e => {
        e.preventDefault();
        const routeID = this.props.match.params.dest_id;
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
    };

    handleDeleteDest = (destID, routeID) => {
        fetch(`${config.API_ENDPOINT}/api/destinations/${destID}`, {
            method: 'DELETE',
            body: JSON.stringify(destID),
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
        this.props.history.push(`/routes/${routeID}`);
    }

    render() {
        let destToEdit = {};
        const destID = this.props.match.params.dest_id;
        for(let i = 0; i < this.context.destinations.length; i++) {
            if (this.context.destinations[i].id === parseInt(destID)) {
                destToEdit = this.context.destinations[i];
            }
        }

        return (
            <div className='EditDestination'>
                <form
                    id='destination-form'
                    onSubmit={this.validateInput}
                >
                    <div className="form-group">
                        <label htmlFor="name">Destination Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            defaultValue={destToEdit.destination}
                        />
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            required
                            defaultValue={destToEdit.content}
                        />
                        <label htmlFor="address">Address</label>
                        <p className='descText'>Need help finding an address?  Search the map below to pinpoint your destination.</p>
                        <input
                            type="text"
                            id="address"
                            required
                            defaultValue={destToEdit.dest_address}
                        />
                        <label htmlFor="sequence">Sequence Number</label>
                        <p className='descText'>Which stop is this along your route? First? Second?</p>
                        <input
                            type="number"
                            id="sequence"
                            required
                            defaultValue={destToEdit.sequence_num}
                        />
                    </div>
                    <button type='submit'>
                        Save Changes
                    </button>
                    {' '}
                    <button type='button' onClick={() => this.handleDeleteDest(parseInt(this.props.match.params.dest_id), destToEdit.route_id)}>
                        Delete Destination
                    </button>
                    {' '}
                    <button type='button' onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        )
    };
}

export default withRouter(EditDestination);