import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import axios from 'axios';

export class FormRequestDetails extends Component {
    continue = e => {
        e.preventDefault();
        console.log("submitting to server");

        //To post data to the server
        axios.post('https://evening-eyrie-66460.herokuapp.com/user/request', this.props.values).then(response => {
          console.log('submitted to server');
        }).catch(err => {
          throw err;
        });
        axios.post('http://localhost:5000/user/request', this.props.values).then(response => {
          console.log('submitted to server');
        }).catch(err => {
          throw err;
        });

        // PROCESS FORM VIA API//
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        // PROCESS FORM VIA API//
        this.props.prevStep();
    }

    render() {
        const { 
            values: {
            typeOfPrototype,
            showcaseSpaceNeeded,
            dimensionOfPrototype,
            noOfPowerPoints,
            pedestals,
            otherRequests
            }
        } = this.props;

        return (
            <MuiThemeProvider >
              <React.Fragment>
                <Dialog 
                  open="true"
                  fullWidth="true"
                  maxWidth='sm'
                >
                    <AppBar>Confirm</AppBar>
                    <List>
                        <ListItem>
                        <ListItemText primary="Type of prototype" secondary={typeOfPrototype} /> 
                        </ListItem>
                        <ListItem>
                        <ListItemText primary="Required space for showcase" secondary={showcaseSpaceNeeded} /> 
                        </ListItem>
                        <ListItem>
                        <ListItemText primary="Physical dimension of prototype" secondary={dimensionOfPrototype} /> 
                        </ListItem>
                        <ListItem>
                        <ListItemText primary="Required number of power points" secondary={noOfPowerPoints} /> 
                        </ListItem>
                        <ListItem>
                        <ListItemText primary="Required number of pedestals" secondary={pedestals} /> 
                        </ListItem>
                        <ListItem>
                        <ListItemText primary="Other requests" secondary={otherRequests} /> 
                        </ListItem>
                    </List>
                    <br />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                  >Continue</Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.back}
                  >Back</Button>
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
