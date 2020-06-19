import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIContext from '../APIContext';
import './DestinationForm.css';

class DestinationForm extends Component {
    static contextType = APIContext;

    validateInput = e => {
        e.preventDefault();
        const routeID = this.props.route_id.route_id;
        const randID = Math.floor((Math.random() * 1000) + 1);
        const input = {
            destination: document.getElementById('name').value,
            content: document.getElementById('description').value,
            address: document.getElementById('address').value,
            sequence_num: document.getElementById('sequence').value,
            route_id: parseInt(routeID),
            id: randID,
            destLat: this.context.selectedAddress.latitude,
            destLng: this.context.selectedAddress.longitude
        }

       this.handleSubmit(input);
    };

    handleSubmit(newDest) {
        this.context.addDest(newDest);
        document.getElementById('destination-form').reset();
        this.props.history.push(`/create-route/add-destinations/${newDest.route_id}`);
    };

    handleFinish = () => {
        const routeID = this.props.route_id.route_id;
        this.props.history.push(`/routes/${routeID}`);
    };

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        return(
            <div className='DestinationForm'>
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
                            placeholder="A great place for local food!"
                        />
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            required
                            placeholder="This place is known to everyone in town for their famous pastries."
                        />
                        <label htmlFor="address">Address</label>
                        <p className='descText'>Need help finding an address?  Search the map below to pinpoint your destination.</p>
                        <input
                            type="text"
                            id="address"
                            required
                            value={this.context.selectedAddress.address}
                            placeholder="42 Wallaby Way, Sydney"
                        />
                        <label htmlFor="sequence">Sequence Number</label>
                        <p className='descText'>Which stop is this along your route? First? Second?</p>
                        <input
                            type="number"
                            id="sequence"
                            required
                            placeholder="1"
                        />
                    </div>
                    <button type='submit'>
                        Add Destination
                    </button>
                    {' '}
                    <button type='button' onClick={this.handleFinish}>
                        Finish Route
                    </button>
                    {' '}
                    <button type='button' onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(DestinationForm);