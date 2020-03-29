import React, {Component} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import EditIcon from '@material-ui/icons/Edit';
import Popup from "reactjs-popup";
import ChatIcon from '@material-ui/icons/Chat';
import {withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import ResizableRect from 'react-resizable-rotatable-draggable';
import Rectangle from 'react-rectangle';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
});


export class AdminPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            width: 100,
            height: 100,
            top: 100,
            left: 100,
            rotateAngle: 0,
            rectangleShow: false,
            groupNoClicked: '',
            contentShow: false,
            sidebarOpen: false,
            listOfGroups: ["Group 1", "Group 2"],
            groupNo: 2,
            data: ["Fucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show alreadyFucking show already"],
            dataDimensionMock: "300 x 100"
        };
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

    toggleSidebar = () => {
        this.state.toggleSidebar = !this.state.toggleSidebar
        if (this.state.toggleSidebar == true){
            this.setState({ drawerIsOpen: true });
        }else{
            this.setState({ drawerIsOpen: false});
        }
    }
    
    registerGroup = () => {
        var newGroupNo = this.state.groupNo + 1;
        this.setState({
            listOfGroups: this.state.listOfGroups.concat('Group ' + newGroupNo),
            groupNo: newGroupNo
        });
    }

    unregisterGroup = (groupNo) => {
        var array = [...this.state.listOfGroups];
        var index = this.listOfGroups.indexOf(groupNo);
        if (index !== -1){
            array.splice(index,1);
            this.setState({listOfGroups: array});
        } 
    }
    
    inputTokenizer = (inpString) => {
        var splitString = inpString.split(" ");
        var result = [splitString[0], splitString[2]];
        return result;
    }
    
    displayData = () => {
        fetch()
            .then(response => {
                console.log(response);
                return response.json()
                })
            .then(data => { 
                console.log(data); 
                this.setState({data: data})
                });
    }
    
    toggleContent = () => {
        this.setState({contentShow: true})     
    }

    toggleRectangle = () => {
        this.setState({rectangleShow: true})
    }
    /*
    componentDidMount= () => {
        this.displayData();
    }
    */

    updateGroupNoClicked = (text) => {
        this.setState({groupNoClicked: text})
    }

    listOfGroupOnClick = (text) => {
        this.toggleContent();
        this.updateGroupNoClicked(text);
    }

    render() {
        const {width, top, left, height, rotateAngle} = this.state;
        const { classes } = this.props;
        var num = this.inputTokenizer(this.state.dataDimensionMock);
        var num1 = parseInt(num[0] , 10 ) ;
        var num2 = parseInt(num[1] , 10 ) ;
        if (this.state.contentShow){
            var data = (
                <div>
                    {this.state.data}
                </div>
            )
        }
        if (this.state.rectangleShow){
            var rectangle = (
                <Rectangle
                    corner={[430, 160]}
                    height={num1}
                    width={num2}
                    color='#FF0266'/>
            )
            var resizableRectangle = (
                <ResizableRect
                    left={left}
                    top={top}
                    width={num2}
                    height={num1}
                    rotateAngle={rotateAngle}
                    // aspectRatio={false}
                    //minWidth={10}
                    //minHeight={10}
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
            )
        }
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => this.onSetSidebarOpen(true),this.toggleSidebar}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                            AdminPage
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        
                        open={this.state.drawerIsOpen}
                    >
                        <div className={classes.toolbar} />
                        <List>
                            {this.state.listOfGroups.map((text) => (
                            <ListItem button key={text} onClick={() => this.listOfGroupOnClick(text)}>
                                <ListItemIcon>{<GroupIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['Allocate Map'].map((text) => (
                            <ListItem button key={text} onClick={this.toggleRectangle}>
                                <ListItemIcon>{<EditLocationIcon /> }</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                        </List>
                        <List>
                            {['Register Group'].map((text) => (
                            <ListItem button key={text} onClick={this.registerGroup}>
                                <ListItemIcon>{ <GroupAddIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                        </List>
                        <List>
                            {['Unregister Group'].map((text) => (
                            <ListItem button key={text} onClick={this.unregisterGroup}>
                                <ListItemIcon>{ <EditIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                        </List>
                        <List>
                            {['Start Chat'].map((text) => (
                            <ListItem button key={text} >
                                <ListItemIcon>{ <ChatIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <Container maxWidth="sm">
                        <div className={classes.toolbar} />
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '50vh'}} >  
                            <Typography  paragraph>{data}</Typography>
                        </Typography>
                        {resizableRectangle}
                    </Container>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(AdminPage)
