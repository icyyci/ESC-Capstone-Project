import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import App from '../App';

export class FormRequestDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { values,handleChange } = this.props;
        return (
            <MuiThemeProvider >
              <React.Fragment>
                <Dialog 
                  open="true"
                  fullWidth="true"
                  maxWidth='sm'
                >
                  <AppBar>Enter Request Details</AppBar>
                  <TextField
                    placeholder="Enter the type of prototype"
                    label="Type of Prototype"
                    onChange={handleChange('typeOfPrototype')}
                    defaultValue={values.typeOfPrototype}
                    margin="normal"
                    fullWidth="true"
                  />
                  <br />
                  <TextField
                    placeholder="Enter the required space for showcase"
                    label="length x wdith (m)"
                    onChange={handleChange('showcaseSpaceNeeded')}
                    defaultValue={values.showcaseSpaceNeeded}
                    margin="normal"
                    fullWidth="true"
                  />
                  <br />
                  <TextField
                    placeholder="Enter the physical dimension of prototype"
                    label="length x width x height (m)"
                    onChange={handleChange('dimensionOfPrototype')}
                    defaultValue={values.dimensionOfPrototype}
                    margin="normal"
                    fullWidth="true"
                  />
                  <br />
                  <TextField
                    placeholder="Enter the number of power points needed"
                    label="integer number e.g 3"
                    onChange={handleChange('noOfPowerPoints')}
                    defaultValue={values.noOfPowerPoints}
                    margin="normal"
                    fullWidth="true"
                  />
                  <br />
                  <TextField
                    placeholder="Enter the type of pedastal needed"
                    label="tall/short"
                    onChange={handleChange('pedestals')}
                    defaultValue={values.pedestals}
                    margin="normal"
                    fullWidth="true"
                  />
                  <br />
                  <TextField
                    placeholder="Please specify another other requests"
                    label="e.g extra tables/chairs"
                    onChange={handleChange('otherRequests')}
                    defaultValue={values.otherRequests}
                    margin="normal"
                    fullWidth="true"
                  />
                  <br />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                  >Continue</Button>
                </Dialog>
              </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    button: {margin: 15}
}
export default FormRequestDetails
