import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DestinationMap from '../DestinationMap/DestinationMap';
import config from '../config';
import APIContext from '../APIContext';
import './Destination.css';

class Destination extends Component {
    static contextType = APIContext;

    getImgRef = () => {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + `${this.props.placeID}` + '&fields=photo&key=' + `${config.GOOGLE_API_KEY}`;
        
        fetch(proxyurl + url)
        .then(response => response.json())
        .then(response => {
            this.getDestImage(response.result.photos[0].photo_reference);
        })
        .catch(error => {
            console.error({error});
        });
    }

    getDestImage = ref => {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + `${ref}` + '&key=' + `${config.GOOGLE_API_KEY}`;
        /*
        fetch(proxyurl + url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error({error});
        });
        */
    }

    handleClickEdit = () => {
        this.props.history.push(`/edit-destination/${this.props.destID}`);
    }

    render() {
        const destImage = this.getImgRef();
        const googleURL = 'https://www.google.com/maps/dir/?api=1&destination=' + `${this.props.formAddress}` + '&destination_place_id=' + `${this.props.placeID}`;

        return (
            <section className="Destination">
                <img className='DestImage' src='https://user-images.githubusercontent.com/58446465/86995952-dc653a00-c199-11ea-8e0e-617d92635bcc.jpg' />
                <h3>{this.props.name}</h3>
                <DestinationMap 
                    destLat={this.props.destLat}
                    destLng={this.props.destLng}
                />
                <p>{this.props.content}</p>
                <a href={googleURL} target='_blank'>Let's Go!</a>
                <button type='button' onClick={this.handleClickEdit}>Edit</button>
            </section>
        )
    };
}

export default withRouter(Destination);