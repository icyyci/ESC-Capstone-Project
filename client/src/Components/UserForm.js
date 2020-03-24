import React, { Component } from 'react'
import FormRequestDetails from './FormRequestDetails';
import Confirm from './Confirm';

export class UserForm extends Component {
    state = {
        step: 1,
        typeOfPrototype: '',
        showcaseSpaceNeeded: '',
        dimensionOfPrototype: '',
        noOfPowerPoints: '',
        pedestals: '',
        otherRequests: ''
    };

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({step: step + 1});
    };

    // Proceed to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({step: step - 1});
    };

    //Handle fields change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    };

    render() {
        const { step } = this.state;
        const { typeOfPrototype, showcaseSpaceNeeded, dimensionOfPrototype, 
        noOfPowerPoints, pedestals, otherRequests} = this.state;
        const values = { typeOfPrototype, showcaseSpaceNeeded, dimensionOfPrototype,
        noOfPowerPoints, pedestals, otherRequests};
        
        switch(step) {
            case 1:
                return (
                    <FormRequestDetails
                        nextStep = {this.nextStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />
                )
            case 2:
                return (
                    <Confirm 
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                        />
                )
            case 3:
                return <h1>Success</h1>
        }
    }
}

export default UserForm
