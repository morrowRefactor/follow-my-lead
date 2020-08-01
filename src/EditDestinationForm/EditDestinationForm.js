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
            dest_lng: { value: '', touched: false },
            selectedAddress: ''
        };
    };

    // sets the default state values to those of the current fields as they exist in the db
    componentDidMount() {
        const currentDest = this.context.destinations.filter(obj => {
            return obj.id === parseInt(this.props.match.params.dest_id)
        });
        
        this.setState({
            destination: {value: currentDest[0]? currentDest[0].destination : 'Destination Needed', touched: false},
            content: {value: currentDest[0]? currentDest[0].content : 'Content Needed', touched: false},
            route_id: {value: currentDest[0]? currentDest[0].route_id : 'RouteID Needed', touched: false},
            sequence_num: {value: currentDest[0]? currentDest[0].sequence_num : 'Sequence Number Needed', touched: false},
            dest_address: {value: currentDest[0]? currentDest[0].dest_address : 'Address Needed', touched: false},
            dest_lat: {value: currentDest[0]? currentDest[0].dest_lat : 'Destination Latitude Needed', touched: false},
            dest_lng: {value: currentDest[0]? currentDest[0].dest_lng : 'Destination Longitude Needed', touched: false},
            selectedAddress: 'not set'
        });
    };

    // update state with form value inputs (controlled component)
    updateDest(dest) {
        this.setState({destination: {value: dest, touched: true}});
    };

    updateContent(content) {
        this.setState({content: {value: content, touched: true}});
    };

    updateSeqNum(num) {
        this.setState({sequence_num: {value: num, touched: true}});
    };

    validateDest() {
        const dest = this.state.destination.value.trim();
        if (dest.length === 0) {
          return 'A destination name is required';
        };
    };

    validateContent() {
        const con = this.state.content.value.trim();
        if (con.length === 0) {
          return 'A destination summary is required';
        };
    };

    // find the current destination being edited, the route it's associated with, 
    // and then pull all the current sequence numbers for that route to flag any duplication
    validateSeqNum() {
        const currentDest = this.context.destinations.filter(obj => {
            return obj.id === parseInt(this.props.match.params.dest_id);
        });
        const allDestinations = this.context.destinations.filter(obj => {
            return obj.route_id === currentDest[0].route_id;
        });
        const excludeCurrentDest = allDestinations.filter(obj => {
            return obj.sequence_num !== currentDest[0].sequence_num;
        });

        const currentSeqNums = excludeCurrentDest.map(dest => dest.sequence_num);

        if (currentSeqNums.includes(parseInt(this.state.sequence_num.value))) {
          return `Sequence number ${this.state.sequence_num.value} already exists in this route`;
        };
    };

    // check whether an address was submitted via a map component, and if so, whether that value matches the current state
    // this populates the area of the form displaying the currently selected address
    checkAddressChange() {
        if(this.context.selectedAddyEditDest.address && this.context.selectedAddyEditDest.address !== this.state.dest_address) {
            return this.context.selectedAddyEditDest.address;
        }
        if(this.state.selectedAddress === 'not set') {
            return this.state.dest_address.value;
        }
        else {
            return this.state.dest_address.value;
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        const input = {
            route_id: this.state.route_id.value,
            destination: this.state.destination.value,
            content: this.state.content.value,
            sequence_num: parseInt(this.state.sequence_num.value),
            dest_address: this.state.dest_address.value,
            dest_lat: this.state.dest_lat.value,
            dest_lng: this.state.dest_lng.value
        };

        //check if a new address has been submitted and if so update new location values
        if(this.context.selectedAddyEditDest.address && this.context.selectedAddyEditDest.address !== this.state.dest_address.value) {
            input.dest_address = this.context.selectedAddyEditDest.address;
            input.dest_lat = this.context.selectedAddyEditDest.lat;
            input.dest_lng = this.context.selectedAddyEditDest.lng;
        };

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
    };

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
    };

    handleClickCancel = (routeID) => {
        this.props.history.push(`/routes/${parseInt(routeID)}`);
    };

    render() {
        const destError = this.validateDest();
        const contentError = this.validateContent();
        const seqNumError = this.validateSeqNum();
        const currAddy = this.checkAddressChange();

        let destToEdit = {};
        const destID = this.props.match.params.dest_id;
        for(let i = 0; i < this.context.destinations.length; i++) {
            if (this.context.destinations[i].id === parseInt(destID)) {
                destToEdit = this.context.destinations[i];
            }
        };

        return (
            <div className='EditDestinationForm featureBox'>
                <h3 className='editDestTitle'>Edit your destination</h3>
                <form
                    id='destination-form'
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="name">Destination Name</label>
                        <input
                            type="text"
                            id="name"
                            defaultValue={destToEdit.destination}
                            onChange={e => this.updateDest(e.target.value)}
                        />
                        {this.state.destination.touched && (
                            <ValidationError message={destError} />
                        )}
                        <label htmlFor="description">Description</label>
                        <textarea
                            type="text"
                            id="description"
                            defaultValue={destToEdit.content}
                            onChange={e => this.updateContent(e.target.value)}
                        />
                        {this.state.content.touched && (
                            <ValidationError message={contentError} />
                        )}
                        <label htmlFor="address">Address</label>
                            <p className='editDestText editDestHighlight'>Use the map below if you'd like to update your destination.</p>
                            <p className='editDestText'>Current Address:<br/>{currAddy}</p>
                        <label htmlFor="sequence">Sequence Number</label>
                        <p className='editDestText'>This destination is currently number {destToEdit.sequence_num} for this route.</p>
                        <input
                            type="number"
                            id="sequence"
                            min="1"
                            defaultValue={destToEdit.sequence_num}
                            onChange={e => this.updateSeqNum(e.target.value)}
                        />
                        {this.state.sequence_num.touched && (
                            <ValidationError message={seqNumError} />
                        )}
                    </div>
                    <div className='EditDestForm_buttons'>
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
                    </div>
                </form>
            </div>
        );
    };
};

export default withRouter(EditDestination);