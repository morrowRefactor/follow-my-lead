import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import config from '../config';
import './DestinationMap.css';


class DestinationMap extends Component {

    render() {
        const MapComponent = withScriptjs(withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={15} 
                center={{ lat: this.props.destLat, lng: this.props.destLng }}
            >
                {<Marker shape="rectangle" position={{ lat: this.props.destLat, lng: this.props.destLng }} />}
            </GoogleMap>
        )))

        return (
            <section className="DestinationMap">
                <MapComponent
                    center={{ lat: this.props.destLat, lng: this.props.destLng }}
                    isMarkerShown
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.GOOGLE_API_KEY}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `200px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </section>
        )
    };
}

export default DestinationMap;