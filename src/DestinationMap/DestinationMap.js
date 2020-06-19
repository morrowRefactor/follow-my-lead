import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import APIContext from '../APIContext';

class DestinationMap extends Component {
    static contextType = APIContext;

    render() {
        const MapComponent = withScriptjs(withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={14} 
                center={{ lat: this.props.destLat, lng: this.props.destLng }}
            >
                {<Marker shape="rectangle" position={{ lat: this.props.destLat, lng: this.props.destLng }} />}
            </GoogleMap>
        )))

        return (
            <section className="DestinationMap">
                <MapComponent
                    center={this.props.destLat, this.props.destLng}
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDFFvmBKhgEPjsrftIYez2j2ZrfyJ7xEeU"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `300px`, position: 'relative', top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0}} />}
                    mapElement={<div style={{ height: `100%`, position: 'relative',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0}} />}
                />
            </section>
        )
    };
}

export default DestinationMap;