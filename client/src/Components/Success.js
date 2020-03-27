import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';

export class Success extends Component {
    constructor(props){
        super(props);
        this.state = {data: []};
    }
    componentDidMount = () => {
        // fetch('/user/request', {method: 'post'})
        //     .then(response => {
        //         console.log(response);
        //         return response.json();
        //         })
        //     .then(data => { 
        //         console.log(data); 
        //         this.setState({data: data})
        //         });

        axios.post('/user/request').then((result) => {
            console.log(result.data);
            this.setState({data: result.data});
        }).catch(err => {
            throw err;
        })
    }
    render() {
        var data = this.state.data;
        return (
            <Container fixed>
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '50vh'}} >  
                    <Typography  paragraph>{JSON.stringify(data)}</Typography>
                </Typography>
            </Container>
        )
    }
}
export default Success