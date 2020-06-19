import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import APIContext from '../APIContext';
import config from '../config';
import './SearchMap.css';



class SearchMap extends Component {
    static contextType = APIContext;

    constructor( props ){
        super( props );
        this.state = {
         latitude: 40.748817,
         longitude: -73.985428,
         address: ''
        }
    }

    updateCoordinates = searchVal => {
        const str = searchVal.replace(/-/g, '+');
        const fetchStr = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + str + '&key=' + `${config.GOOGLE_API_KEY}`

        fetch(fetchStr)
        .then(response => response.json())
        .then(response => {
            this.setState({
                latitude: response.results[0].geometry.location.lat,
                longitude: response.results[0].geometry.location.lng,
                address: searchVal
            })
        })
        .catch(error => {
            console.error({error});
        });
    }

    setAddress = e => {
        e.preventDefault();
        const addy = document.getElementById('searchAddress').value;
        this.updateCoordinates(addy);
    }

    confirmAddress = () => {
        this.context.addressTransfer(this.state);
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render(){
        console.log(config)
        console.log(`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.GOOGLE_API_KEY}`)

        const MapComponent = withScriptjs(withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={14} 
                center={{ lat: this.state.latitude, lng: this.state.longitude }}
            >
                {<Marker shape="rectangle" position={{ lat: this.state.latitude, lng: this.state.longitude }} />}
            </GoogleMap>
        )))

        return (
            <div className='SearchMap'>
                <MapComponent
                    center={this.state.latitude, this.state.longitude}
                    isMarkerShown
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.GOOGLE_API_KEY}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `300px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <form 
                    className='AddressForm'
                    onSubmit={this.setAddress}
                >
                    <div className="form-group">
                        <label htmlFor="Address">Address</label>
                        <input
                            type="text"
                            id="searchAddress"
                            placeholder="42 Wallaby Way, Sydney"
                        />
                    </div>
                    <button type='submit'>
                        Search Address
                    </button>
                    {' '}
                    <button onClick={this.confirmAddress}>
                        Use This Address
                    </button>
                </form>
            </div>
        )
    }
}

export default SearchMap;