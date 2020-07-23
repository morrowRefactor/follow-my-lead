import React, { Component } from 'react';
import DestinationForm from '../DestinationForm/DestinationForm';
import SearchMap from '../SearchMap/SearchMap';
import './AddDestination.css';

class AddDestination extends Component {
    render() {
        return (
            <div className='AddDestination'>
                <DestinationForm 
                    route_id={this.props.match.params.route_id}
                />
                <SearchMap 
                    value={this.props}    
                /> 
            </div>
        )
    }
}

export default AddDestination;