import React, { Component } from 'react';
import floor1 from './Floor 1.png';
import floor2 from './Floor 2.png';
import Button from '@material-ui/core/Button';
import { Rnd } from "react-rnd";
import ReactCrop from 'react-image-crop';
import axios from 'axios';

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#ffcff0",
  };
  
export class MapPage extends Component {

    state={
        url: "",
        width: 500,
        height: 400,
        x: 0,
        y: 0,
        listOfRectangles: [],
        groupNo: "",
        listOfGroups: [],
        buttons: [],
        //screen capture
        screenCapture: "",
        open: false,
        title: "gimmeatitle"

    }

    handleOnClick = (text) => {
        //axios.get  x,y, width, height,grpNo
        console.log("grp clicked");
        var text = text.split(" ").join("").toLowerCase();
        this.setState({groupNo:text});
        axios.post(this.state.url, {request: "data", group: text}).then((res => {
            console.log(res.data);
            this.setState({x: res.data.x});
            this.setState({y: res.data.y});
            this.setState({width: res.data.width});
            this.setState({height: res.data.height});
        })).then(() => {
            console.log("retrieved data, creating rectangle");
            this.createRectangles(text);
        })
    }

    createRectangles = (text) => {  
        console.log(this.state.x);
        console.log(this.state.y);
        this.setState({
        listOfRectangles: this.state.listOfRectangles.concat(
            <Rnd
            style={style}
            default={{
                x: this.state.x,
                y: this.state.y,
                width: this.state.width,
                height: this.state.height,
            }}
            onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
            onResize={(e, direction, ref, delta, position) => {
                this.setState({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
                });
            }}
            >
            {text}
            </Rnd>
        ),
        });

    }

    handleConfirmAllocation = () => {
        //post x,y,width,height to server
        var requestJson = {request: "confirm",
            group: this.state.groupNo,
            x: this.state.x,
            y: this.state.y,
            width: this.state.width,
            height: this.state.height
        }
        axios.post(this.state.url, requestJson).then(res => {
            console.log("saved to database");
        })
    }

    render() {
        //axios.get(listofgroups)
        if (window.location.host == "localhost:5000") {
            this.state.url = "http://" + window.location.host + "/map";
        }
        else {
            this.state.url = "https://" + window.location.host + "/map";
        }
        axios.post(this.state.url, {request: "firstload"}).then((res) => {
            //console.log(res.data);
            this.setState({listOfGroups: res.data});
        });
        //console.log(this.state.x);
        //console.log(this.state.y);
        return (
            <div>
                {this.state.listOfRectangles}
                <img src={floor1} ></img>
                <img src={floor2}></img>
                <br></br>
                <div>
                    {this.state.listOfGroups.map((text) => (
                        <Button onClick={() => {this.handleOnClick(text)}}>
                            {text}
                        </Button>
                    ))}
                </div>
                <br/>

                <Button onClick={this.handleConfirmAllocation}>Confirm Allocation</Button>
                
            </div>
        )
    }
}

export default MapPage
