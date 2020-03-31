import React, { Component } from 'react'
import { Rectangle } from 'draw-shape-reactjs';
import ResizableRect from 'react-resizable-rotatable-draggable';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export class drawBox extends Component {
    //resizable triangle
    constructor(){
      super()
      this.state = {
        width: 100,
        height: 100,
        top: 100,
        left: 100,
        rotateAngle: 0
      }
    }
    
    handleResize = (style, isShiftKey, type) => {
      // type is a string and it shows which resize-handler you clicked
      // e.g. if you clicked top-right handler, then type is 'tr'
      let { top, left, width, height } = style
      top = Math.round(top)
      left = Math.round(left)
      width = Math.round(width)
      height = Math.round(height)
      this.setState({
        top,
        left,
        width,
        height
      })
    }
  
    handleRotate = (rotateAngle) => {
      this.setState({
        rotateAngle
      })
    }
  
    handleDrag = (deltaX, deltaY) => {
      this.setState({
        left: this.state.left + deltaX,
        top: this.state.top + deltaY
      })
    }

    inputTokenizer = (inpString) => {
      var splitString = inpString.split(" ");
      var result = [splitString[0], splitString[2]];
      return result;
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const {width, top, left, height, rotateAngle} = this.state;
        const { values: {showcaseSpaceNeeded} } = this.props;
        var num = this.inputTokenizer(showcaseSpaceNeeded);
        var num1 = parseInt(num[0].substring() , 10 ) + 1;
        var num2 = parseInt(num[1].substring() , 10 ) + 1;
        return (
            <MuiThemeProvider>
              <React.Fragment>
                <ResizableRect
                    left={left}
                    top={top}
                    width={width}
                    height={height}
                    rotateAngle={rotateAngle}
                    // aspectRatio={false}
                    // minWidth={10}
                    // minHeight={10}
                    zoomable='n, w, s, e, nw, ne, se, sw'
                    // rotatable={true}
                    // onRotateStart={this.handleRotateStart}
                    onRotate={this.handleRotate}
                    // onRotateEnd={this.handleRotateEnd}
                    // onResizeStart={this.handleResizeStart}
                    onResize={this.handleResize}
                    // onResizeEnd={this.handleUp}
                    // onDragStart={this.handleDragStart}
                    onDrag={this.handleDrag}
                    // onDragEnd={this.handleDragEnd}
                  />
                  <Rectangle
                    corner={[430, 160]}
                    height={num1}
                    width={num2}
                    color='#FF0266'
                  />
                  <AppBar>drawBox</AppBar>
                  
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
                
              </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default drawBox