import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import DestinationMap from '../DestinationMap/DestinationMap';
import APIContext from '../APIContext';
import './Destination.css';

class Destination extends Component {
    static contextType = APIContext;

    handleClickEdit = () => {
        this.props.history.push(`/edit-destination/${this.props.destID}`);
    }

    render() {
        return (
            <section className="Destination">
                <DestinationMap 
                    destLat={this.props.destLat}
                    destLng={this.props.destLng}
                />
                <h3>{this.props.name}</h3>
                <div className='DesImage'>[image]</div>
                <p>{this.props.content}</p>
                <button type='button' onClick={this.handleClickEdit}>Edit</button>
            </section>
        )
    };
}

export default withRouter(Destination);