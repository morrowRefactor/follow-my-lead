import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import config from '../config';
import APIContext from '../APIContext';
import './SearchMap.css';

class SearchMap extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props);
        this.state = {
            addySearched: false,
            latitude: 40.748817,
            longitude: -73.985428,
            place_id: '',
            formatted_address: ''
        }
    }

    updateCoordinates = searchVal => {
        const str = searchVal.replace(/-/g, '+');
        const fetchStr = `https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=${config.GOOGLE_API_KEY}`

        fetch(fetchStr)
        .then(response => response.json())
        .then(response => {
            this.setState({
                latitude: response.results[0].geometry.location.lat,
                longitude: response.results[0].geometry.location.lng,
                place_id: response.results[0].place_id,
                formatted_address: response.results[0].formatted_address,
                addySearched: true
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

    toTitleCase = (addy) => {
        return addy.replace(/\w\S*/g, function(addy){
            return addy.charAt(0).toUpperCase() + addy.substr(1).toLowerCase();
        });
    }

    confirmAddress = () => {
        const addy = document.getElementById('searchAddress').value;
        const cleanAddy = this.toTitleCase(addy)
        const selectedAddy = {
            address: cleanAddy,
            lat: this.state.latitude,
            lng: this.state.longitude,
            place_id: this.state.place_id,
            formatted_address: this.state.formatted_address
        }
        if(this.props.value.location.pathname.includes('create-route')) {
            this.context.addyTransferAddDest(selectedAddy);
        }
        if(this.props.value.location.pathname.includes('edit-destination')) {
            this.context.addyTransferEditDest(selectedAddy);
        }
    }

    render(){
        const MapComponent = withScriptjs(withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={13} 
                center={{ lat: this.state.latitude, lng: this.state.longitude }}
            >
                {<Marker shape="rectangle" position={{ lat: this.state.latitude, lng: this.state.longitude }} />}
            </GoogleMap>
        )))

        return (
            <div className='SearchMap featureBox'>
                <form 
                    className='AddressForm'
                    onSubmit={this.setAddress}
                >
                    <div className="form-group">
                        <label htmlFor="searchAddress" className='searchMapTitle'>Find Your Address</label>
                        <p className='searchText'>Search for an exact address ("20 W 34th St, New York, NY") OR by keyword ("Empire State Building NY").</p>
                        <input
                            type="text"
                            id="searchAddress"
                            placeholder="20 W 34th St, New York, NY"
                        />
                    </div>
                    <button type='submit'>
                        Search Address
                    </button>
                    {' '}
                    <button 
                        onClick={this.confirmAddress}
                        disabled={this.state.addySearched === false}
                    >
                        Confirm Address
                    </button>
                </form>
                <MapComponent
                    center={{ lat: this.state.latitude, lng: this.state.longitude }}
                    isMarkerShown
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.GOOGLE_API_KEY}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `300px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}

export default SearchMap;