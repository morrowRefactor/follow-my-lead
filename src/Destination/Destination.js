import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import APIContext from '../APIContext';
import './Destination.css';

class Destination extends Component {
    static contextType = APIContext;

    render() {
        return (
            <section className="Destination">
                <h3>{this.props.name}</h3>
                <div className='DesImage'>[image]</div>
                <p>{this.props.content}</p>
            </section>
        )
    };
}

export default Destination;