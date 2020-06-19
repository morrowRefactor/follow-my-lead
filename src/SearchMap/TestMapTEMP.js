import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import APIContext from '../APIContext';
import config from '../config';
import './SearchMap.css';

Geocode.setApiKey(config.GOOGLE_API_KEY);
Geocode.enableDebug();

class SearchMap extends Component {
    static contextType = APIContext;

    constructor( props ){
        super( props );
        this.state = {
         address: '',
         city: '',
         state: '',
         mapPosition: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
         },
         markerPosition: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
        }
        }
    }

    componentDidMount() {
        Geocode.fromLatLng( this.props.center.lat , this.props.center.lng ).then(
         response => {
          const address = response.results[0].formatted_address,
           addressArray =  response.results[0].address_components,
           city = this.getCity( addressArray ),
           state = this.getState( addressArray );
        
          this.setState( {
           address: ( address ) ? address : '',
           city: ( city ) ? city : '',
           state: ( state ) ? state : '',
          } )
         },
         error => {
          console.error(error);
         }
        );
    };

    shouldComponentUpdate( nextProps, nextState ){
        if (
         this.state.markerPosition.lat !== this.props.center.lat ||
         this.state.address !== nextState.address ||
         this.state.city !== nextState.city ||
         this.state.state !== nextState.state
        ) {
         return true
        } else if ( this.props.center.lat === nextProps.center.lat ){
         return false
        }
    }

    getCity = ( addressArray ) => {
        let city = '';
        for( let i = 0; i < addressArray.length; i++ ) {
         if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
          city = addressArray[ i ].long_name;
          return city;
         }
        }
    };

    getState = ( addressArray ) => {
        let state = '';
        for( let i = 0; i < addressArray.length; i++ ) {
         for( let i = 0; i < addressArray.length; i++ ) {
          if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
           state = addressArray[ i ].long_name;
           return state;
          }
         }
        }
    };

    onChange = ( event ) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render(){
        const AsyncMap = withScriptjs(
           withGoogleMap(
            props => (
             <GoogleMap google={this.props.google}
              defaultZoom={this.props.zoom}
              defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
             >
              {/* For Auto complete Search Box */}
              <Autocomplete
               style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '100px'
               }}
               onPlaceSelected={ this.onPlaceSelected }
               types={['(regions)']}
              />
        {/*Marker*/}
              <Marker google={this.props.google}
               name={'Dolores park'}
                  draggable={true}
                  onDragEnd={ this.onMarkerDragEnd }
                     position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
              />
              <Marker />
        {/* InfoWindow on top of marker */}
              <InfoWindow
               onClose={this.onInfoWindowClose}
               position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
              >
               <div>
                <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
               </div>
              </InfoWindow>
        </GoogleMap>
        )
           )
          );
        let map;
          if( this.props.center.lat !== undefined ) {
           map = <div>
            <AsyncMap
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyDFFvmBKhgEPjsrftIYez2j2ZrfyJ7xEeU&libraries=places'
              loadingElement={
               <div style={{ height: `100%` }} />
              }
              containerElement={
               <div style={{ height: this.props.height }} />
              }
              mapElement={
               <div style={{ height: `100%` }} />
              }
             />
             <form 
                className='DestinationForm'
            >
             <div className='form'>
              <div className="form-group">
               <label htmlFor="">City</label>
               <input type="text" name="city" className="form-control" onChange={ this.onChange } value={ this.state.city }/>
              </div>
              <div className="form-group">
               <label htmlFor="">State</label>
               <input type="text" name="state" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state }/>
              </div>
              <div className="form-group">
               <label htmlFor="">Address</label>
               <input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
              </div>
             </div>
             </form>
            </div>
        } else {
           map = <div style={{height: this.props.height}} />
          }
          return( map )
    }
}

export default SearchMap;