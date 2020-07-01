import React, { Component } from 'react';
import DestinationForm from '../DestinationForm/DestinationForm';
import SearchMap from '../SearchMap/SearchMap';
import './AddDestination.css';

class AddDestination extends Component {
    render() {
        return (
            <div className='AddDestination'>
                <h3>Add destinations to your route</h3>
                <DestinationForm 
                    route_id={this.props.match.params.route_id}
                />
                <SearchMap /> 
            </div>
        )
    }
}

export default AddDestination;