import React, { Component } from 'react';
import DestinationForm from '../DestinationForm/DestinationForm';
import SearchMap from '../SearchMap/SearchMap';
import APIContext from '../APIContext';
import './AddDestination.css';

class AddDestination extends Component {
    static contextType = APIContext;

    render() {
        return (
            <section className="AddDestination"> 
                <h3>Add destinations to your route</h3>
                <DestinationForm
                    route_id={this.props.match.params}
                />
                <SearchMap
                    height='300px'
                    zoom={13}
                />
            </section>
        )
    };
}

export default AddDestination;