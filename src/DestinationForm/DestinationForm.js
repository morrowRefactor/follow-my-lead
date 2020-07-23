import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ValidationError from '../ValidationError/ValidationError';
import APIContext from '../APIContext';
import config from '../config';
import './DestinationForm.css';

class DestinationForm extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props);
        this.state = {
            name: { value: '', touched: false },
            description: { value: '', touched: false },
            address: { value: '', touched: false },
            sequence_num: { value: '', touched: false }
        }
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }

    updateDesc(desc) {
        this.setState({description: {value: desc, touched: true}});
    }

    updateSeqNum(num) {
        this.setState({sequence_num: {value: num, touched: true}});
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'A destionation name is required';
        }
    }

    validateDesc() {
        const desc = this.state.description.value.trim();
        if (desc.length === 0) {
          return 'A description is required';
        }
    }

    validateSeqNum() {
        const currentDests = this.context.destinations.filter(obj => {
            return obj.route_id === parseInt(this.props.route_id)
        })
        const currentSeqNums = currentDests.map(dest => dest.sequence_num)
        if (currentSeqNums.includes(parseInt(this.state.sequence_num.value))) {
          return `Sequence number ${this.state.sequence_num.value} already exists in this route`;
        }
    }

    validateInput = e => {
        e.preventDefault();
        const routeID = this.props.route_id;
        const input = {
            destination: this.state.name.value,
            content: this.state.description.value,
            dest_address: this.context.selectedAddyAddDest.address,
            sequence_num: parseInt(this.state.sequence_num.value),
            route_id: parseInt(routeID),
            dest_lat: this.context.selectedAddyAddDest.lat,
            dest_lng: this.context.selectedAddyAddDest.lng,
            place_id: this.context.selectedAddyAddDest.place_id,
            formatted_address: this.context.selectedAddyAddDest.formatted_address
        }

       this.handleSubmit(input);
    };

    handleSubmit(newDest) {
        fetch(`${config.API_ENDPOINT}/api/destinations`, {
            method: 'POST',
            body: JSON.stringify(newDest),
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
              return res.json()
            })
            .then(data => {
              this.context.addDest(data)
            })
            .catch(error => {
              this.setState({ error })
            })
        document.getElementById('destination-form').reset();
        this.setState({sequence_num: {value: 0, touched: true}});
        this.props.history.push(`/create-route/add-destinations/${newDest.route_id}`);
    };

    handleFinish = () => {
        const routeID = parseInt(this.props.route_id);
        this.props.history.push(`/routes/${routeID}`);
    };

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        const nameError = this.validateName();
        const descError = this.validateDesc();
        const seqError = this.validateSeqNum();

        const routeName = this.context.routes.filter(obj => {
            return obj.id === parseInt(this.props.route_id)
        })

        const numDest = this.context.destinations.filter(obj => {
            return obj.route_id === parseInt(this.props.route_id)
        })

        let finishClass = '';
        if(numDest.length < 1) {
            finishClass = 'hidden'
        }
        if(numDest.length >= 1) {
            finishClass = 'addDestFormFinishRoute'
        }

        return( 
            <div className='AddDestinationForm featureBox'>
                <h3 className='addDestFormTitle'>Add Destinations to Your Route</h3>
                <h3 className='addDestFormRouteTitle'>{routeName[0].route_name}</h3>
                <form
                    id='destination-form'
                    onSubmit={this.validateInput}
                >
                    <div className="form-group">
                        <label htmlFor="name">Destination Name</label>
                        <input
                            type="text"
                            id="name"
                            defaultValue='My New Destination'
                            onChange={e => this.updateName(e.target.value)}
                            required
                        />
                        {this.state.name.touched && (
                            <ValidationError message={nameError} />
                        )}
                        <label htmlFor="description">Description</label>
                        <textarea
                            type="text"
                            id="description"
                            defaultValue="This place is known to everyone in town for their famous pastries."
                            onChange={e => this.updateDesc(e.target.value)}
                            required
                        />
                        {this.state.description.touched && (
                            <ValidationError message={descError} />
                        )}
                        <label htmlFor="sequence">Sequence Number</label>
                        <p className='seqText'>Which stop is this along your route? First? Second?</p>
                        <input
                            type="number"
                            id="sequence"
                            required
                            min="1"
                            placeholder="0"
                            onChange={e => this.updateSeqNum(e.target.value)}
                        />
                        {this.state.sequence_num.touched && (
                            <ValidationError message={seqError} />
                        )}
                        <p className='addDestFormHeader'>Address</p>
                        <p className='addDestFormDescText'>Use the map below to pinpoint your destination.</p>
                        <p className='addDestFormAddyText'>Current Selected Address:<br/> {this.context.selectedAddyAddDest.address || `None selected`}</p>
                    </div>
                    <div className='AddDestinationForm_buttons'>
                        <button 
                            type='submit'
                            disabled={!this.context.selectedAddyAddDest.formatted_address}
                        >
                            Add Destination
                        </button>
                        {' '}
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
                <div className={finishClass}>
                    <button type='button' onClick={this.handleFinish} className='addDestFormFinishButton'>
                        Finish Route
                    </button>
                    <p className='addDestFormFinishRouteText'>I'm done adding destinations.  Let's see my route!</p>
                </div>
            </div>
        )
    }
}

export default withRouter(DestinationForm);