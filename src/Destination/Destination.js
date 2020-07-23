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
        /*const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + `${this.props.placeID}` + '&fields=photo&key=' + `${config.GOOGLE_API_KEY}`;*/
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.props.placeID}&fields=photo&key=${config.GOOGLE_API_KEY}`;
        /*
        fetch(proxyurl + url)
        .then(response => response.json())
        .then(response => {
            this.getDestImage(response.result.photos[0].photo_reference);
        })
        .catch(error => {
            console.error({error});
        });*/
    }

    getDestImage = ref => {
        const proxyurl = 'https://cors-anywhere.herokuapp.com/';
        const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${config.GOOGLE_API_KEY}`;
        const corsLink = `${proxyurl}${url}`
        
        fetch(corsLink, {
            mode: 'cors',
            headers : { 
              'Origin': 'https://follow-my-lead.vercel.app/'
             }
          })
        /*.then(response => response.json())*/
        .then(response => {
            console.log(response.headers)
        })
        .catch(error => {
            console.error({error});
        });
    }

    handleClickEdit = () => {
        this.props.history.push(`/edit-destination/${this.props.destID}`);
    }

    render() {
        const destImage = this.getImgRef();
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