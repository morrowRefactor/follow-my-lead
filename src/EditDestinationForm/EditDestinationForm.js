import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import config from '../config';
import './EditDestinationForm.css';

class EditDestination extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props);
        this.state = {
            destination: { value: '', touched: false },
            content: { value: '', touched: false },
            route_id: { value: '', touched: false },
            sequence_num: { value: '', touched: false },
            dest_address: { value: '', touched: false },
            dest_lat: { value: '', touched: false },
            dest_lng: { value: '', touched: false }
        }
    }

    componentDidMount() {
        const currentDest = this.context.destinations.filter(obj => {
            return obj.id === parseInt(this.props.match.params.dest_id)
        })

        this.setState({
            destination: {value: currentDest[0].destination, touched: false},
            content: {value: currentDest[0].content, touched: false},
            route_id: {value: currentDest[0].route_id, touched: false},
            sequence_num: {value: currentDest[0].sequence_num, touched: false},
            dest_address: {value: currentDest[0].dest_address, touched: false},
            dest_lat: {value: currentDest[0].dest_lat, touched: false},
            dest_lng: {value: currentDest[0].dest_lng, touched: false}
        })
    }

    //manage form updates and field validation
    updateDest(dest) {
        this.setState({destination: {value: dest, touched: true}});
    }

    updateContent(content) {
        this.setState({content: {value: content, touched: true}});
    }

    updateSeqNum(num) {
        this.setState({sequence_num: {value: num, touched: true}});
    }

    validateDest() {
        const dest = this.state.destination.value.trim();
        if (dest.length === 0) {
          return 'A destination name is required';
        }
    }

    validateContent() {
        const con = this.state.content.value.trim();
        if (con.length === 0) {
          return 'A destination summary is required';
        }
    }

    validateSeqNum() {
        const currentDest = this.context.destinations.filter(obj => {
            return obj.id === parseInt(this.props.match.params.dest_id)
        })
        const allDestinations = this.context.destinations.filter(obj => {
            return obj.route_id === currentDest[0].route_id;
        })
        const excludeCurrentDest = allDestinations.filter(obj => {
            return obj.sequence_num !== parseInt(this.props.match.params.dest_id)
        })

        const currentSeqNums = excludeCurrentDest.map(dest => dest.sequence_num);

        if (currentSeqNums.includes(parseInt(this.state.sequence_num.value))) {
          return `Sequence number ${this.state.sequence_num.value} already exists in this route`;
        }
    }

    checkAddressChange() {
        const currentDest = this.context.destinations.filter(obj => {
            return obj.id === parseInt(this.props.match.params.dest_id)
        })

        if(this.context.selectedAddress2.address && currentDest[0].dest_address !== this.context.selectedAddress2.address && this.state.dest_address.value !== this.context.selectedAddress2.address) {
           this.setState({
                dest_address: {value: this.context.selectedAddress2.address, touched: true},
                dest_lat: {value: this.context.selectedAddress2.lat, touched: true},
                dest_lng: {value: this.context.selectedAddress2.lng, touched: true}
            })
        }
    }

    //handle form submission and PATCH/DELETE requests
    handleSubmit = e => {
        e.preventDefault();
        const currentDest = this.context.destinations.filter(obj => {
            return obj.id === parseInt(this.props.match.params.dest_id)
        })

        const input = {
            route_id: currentDest[0].route_id,
            destination: this.state.destination.value,
            content: this.state.content.value,
            sequence_num: parseInt(this.state.sequence_num.value),
            dest_address: this.state.dest_address.value,
            dest_lat: this.state.dest_lat.value,
            dest_lng: this.state.dest_lng.value
        }

        if(this.context.selectedAddress2.address && this.context.selectedAddress2.address !== this.state.dest_address.value) {
            input.dest_address = this.context.selectedAddress2.address;
            input.dest_lat = this.context.selectedAddress2.lat;
            input.dest_lng = this.context.selectedAddress2.lng;
        }

        this.handleUpdateDest(input);
    };

    handleUpdateDest(input) {
        fetch(`${config.API_ENDPOINT}/api/destinations/${this.props.match.params.dest_id}`, {
            method: 'PATCH',
            body: JSON.stringify(input),
            headers: {
              'content-type': 'application/json'
            }
          })
            .then(res => {
              if (!res.ok) {
                return res.json().then(error => {
                  throw error
                })
              }
            })
            .then(data => {
                this.context.handlePatchDelete();
            })
            .catch(error => {
              this.setState({ error })
            }) 
        
        this.props.history.push(`/routes/${input.route_id}`); 
    }

    handleDeleteDest = (destID, routeID) => {
        fetch(`${config.API_ENDPOINT}/api/destinations/${destID}`, {
            method: 'DELETE',
            body: JSON.stringify(destID),
            headers: {
              'content-type': 'application/json'
            }
          })
            .then(res => {
              if (!res.ok) {
                return res.json().then(error => {
                  throw error
                })
              }
            })
            .then(data => {
              this.context.handleDelete();
            })
            .catch(error => {
              this.setState({ error })
        })
        this.props.history.push(`/routes/${routeID}`);
    }

    handleClickCancel = (routeID) => {
        this.props.history.push(`/routes/${parseInt(routeID)}`);
    };

    render() {
        const destError = this.validateDest();
        const contentError = this.validateContent();
        const seqNumError = this.validateSeqNum();

        let destToEdit = {};
        const destID = this.props.match.params.dest_id;
        for(let i = 0; i < this.context.destinations.length; i++) {
            if (this.context.destinations[i].id === parseInt(destID)) {
                destToEdit = this.context.destinations[i];
            }
        }

        const destRoute = this.context.routes.filter(obj => {
            return obj.id === destToEdit.route_id
        })
        const destLocation = this.context.locations.filter(obj => {
            return obj.id === destRoute[0].location_id
        })
        console.log('destroute', destRoute)
        console.log('destloc', destLocation)

        return (
            <div className='EditDestinationForm'>
                <form
                    id='destination-form'
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="name">Destination Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            defaultValue={destToEdit.destination}
                            onChange={e => this.updateDest(e.target.value)}
                        />
                        {this.state.destination.touched && (
                            <ValidationError message={destError} />
                        )}
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            required
                            defaultValue={destToEdit.content}
                            onChange={e => this.updateContent(e.target.value)}
                        />
                        {this.state.content.touched && (
                            <ValidationError message={contentError} />
                        )}
                        <label htmlFor="address">Address</label>
                        <p className='editDescText'>Use the map below if you'd like to update your destination.</p>
                        
                        <label htmlFor="sequence">Sequence Number</label>
                        <p className='editDescText'>The current sequence number for this destination is {destToEdit.sequence_num}</p>
                        <input
                            type="number"
                            id="sequence"
                            min="1"
                            required
                            defaultValue={destToEdit.sequence_num}
                            onChange={e => this.updateSeqNum(e.target.value)}
                        />
                        {this.state.sequence_num.touched && (
                            <ValidationError message={seqNumError} />
                        )}
                    </div>
                    <button type='submit'>
                        Save Changes
                    </button>
                    {' '}
                    <button type='button' onClick={() => this.handleDeleteDest(parseInt(this.props.match.params.dest_id), destToEdit.route_id)}>
                        Delete Destination
                    </button>
                    {' '}
                    <button type='button' onClick={() => this.handleClickCancel(destToEdit.route_id)}>
                        Cancel
                    </button>
                </form>
            </div>
        )
    };
}

export default withRouter(EditDestination);