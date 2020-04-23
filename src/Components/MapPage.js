import React, { Component } from 'react'
import floor1 from './Floor 1.png'
import floor2 from './Floor 2.png'
import Button from '@material-ui/core/Button';
import { Rnd } from "react-rnd";
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
        listOfRectangles: [],
        listjson:[{x:100,y:500,width:500,height:400,Group:12}], //{x:,y:,width:,height:,grpno:}
    }


    handleonClick = () => {
        var temp = [];
        for (var i = 0; i < this.state.listjson.length; i++){
            temp.push(
                <Rnd
                style={style}
                default={{
                    x: this.state.listjson[i].x,
                    y: this.state.listjson[i].y,
                    width: this.state.listjson[i].width,
                    height: this.state.listjson[i].height,
                }}
                disableDragging={true} enableResizing={false}
                >
                {this.state.listjson[i].Group}
                </Rnd>
            )
        }
        this.setState({listOfRectangles:temp});
    }

    render() {
        if (window.location.host == "localhost:5000") {
            this.state.url = "http://" + window.location.host + "/groupallocation";
        }
        else {
            this.state.url = "https://" + window.location.host + "/groupallocation";
        }
        axios.post(this.state.url, {request: "firstload"}).then (res => {
            console.log(res.data);
            this.setState({listjson: res.data});
        })
        return (
            <div>
                {this.state.listOfRectangles}
                <img src={floor1} ></img>
                <img src={floor2}></img>
                <Button onClick={this.handleonClick}>Load Map</Button>
            </div>
        )
    }
}

export default MapPage
