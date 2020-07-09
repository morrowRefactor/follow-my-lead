import React, { Component } from 'react';
import EditDestinationForm from '../EditDestinationForm/EditDestinationForm';
import SearchMap from '../SearchMap/SearchMap';
import APIContext from '../APIContext';
import './EditDestination.css';

class EditDestination extends Component {
    static contextType = APIContext;

    render() {

        return (
            <div className='AddDestination'>
                <h3>Add destinations to your route</h3>
                <EditDestinationForm />
                <SearchMap 
                    value={this.props}
                /> 
            </div>
        )
    }
}

export default EditDestination;