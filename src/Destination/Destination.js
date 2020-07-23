import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DestinationMap from '../DestinationMap/DestinationMap';
import APIContext from '../APIContext';
import './Destination.css';

class Destination extends Component {
    static contextType = APIContext;

    handleClickEdit = () => {
        this.props.history.push(`/edit-destination/${this.props.destID}`);
    }

    render() {
        const googleURL = `https://www.google.com/maps/dir/?api=1&destination=${this.props.formAddress}&destination_place_id=${this.props.placeID}`;

        return (
            <section className="Destination featureBox">
                <img className='destinationImage featureImage' src='https://user-images.githubusercontent.com/58446465/86995952-dc653a00-c199-11ea-8e0e-617d92635bcc.jpg' alt='Route destination'/>
                <h3 className='destinationTitle'>{this.props.name}</h3>
                <button className='destinationEditLink' onClick={this.handleClickEdit}>Edit Destination</button>
                <DestinationMap 
                    destLat={this.props.destLat}
                    destLng={this.props.destLng}
                />
                <p className='destinationContent'>{this.props.content}</p>
                <a className='destinationStartButton' href={googleURL} target='_blank' rel="noopener noreferrer">Let's Go!</a>
            </section>
        )
    };
}

export default withRouter(Destination);