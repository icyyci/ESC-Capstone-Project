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
import {withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import axios from 'axios';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
            groupNoClicked: '',
            contentShow: false,
            sidebarOpen: false,
            listOfGroups: [],
            groupNo: 2,
            data: [],
            url: '',
            dialogueOpen:false,
            announcement: ''
        };
    }

    handleClickOpen = () => {
        this.setState({dialogueOpen:true});
    };

    handleClose = () => {
        this.setState({dialogueOpen:false});
    };

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
            listOfGroups: this.state.listOfGroups.concat(['Group ' + newGroupNo]),
            groupNo: newGroupNo
        });
        window.location = this.state.url + "/admin/registergroup";
    }

    unregisterGroup = (groupNo) => {
        var array = [...this.state.listOfGroups];
        var index = this.listOfGroups.indexOf(groupNo);
        if (index !== -1){
            array.splice(index,1);
            this.setState({listOfGroups: array});
        } 
    }

    toggleContent = () => {
        this.setState({contentShow: true})     
    }

    displayData = (text) => {
        console.log("sending request");
        axios.post(this.state.url + "/admin", {request:"data", group:text}).then(res => {
            console.log(res.data);
            this.setState({data: JSON.stringify(res.data)});
            this.setState({groupNoClicked: text});
            this.setState({contentShow: true});   
        });

    }

    listOfGroupOnclick = (text) => {
        text = text.split(' ').join('').toLowerCase();
        this.updateGrpNoClicked(text);
        this.displayData(text);
    }

    updateGrpNoClicked = (text) => {
        this.setState({groupNoClicked: text});
    }

    //Get message from announcements
    handleAnnouncement = input => e => {
        this.setState({[input]: e.target.value});
    }
    
    // POST ANNOUNCEMENT TO SERVER
    post = () => {
        axios.post(this.state.url + "/admin", {request:"announcement", message:this.state.announcement, group:"all"}).then( res => {
            console.log(this.state.announcement);
            this.handleClose();
        })
    }
    // START CHAT WITH SPECIFIC GROUP use this.state.grpNoClicked
    startChat = () => {
        var chatURL = ""
        console.log(this.state.groupNoClicked);
        if (window.location.host == "localhost:5000") {
            chatURL = "http://" + window.location.host + "/chat/?chat=" + this.state.groupNoClicked;
        }
        else {
            chatURL = "https://" + window.location.host + "/chat/?chat=" + this.state.groupNoClicked;
        }
        window.location = chatURL;
    }
    
    
    render() {
        if (window.location.host == "localhost:5000") {
            this.state.url = "http://" + window.location.host;
        }
        else {
            this.state.url = "https://" + window.location.host;
        }
        axios.post(this.state.url + "/admin", {request:"firstload"}).then( res => {
            console.log(res.data)
            this.state.listOfGroups = res.data;
        })
        const { classes } = this.props;
        if (this.state.contentShow){
            var data = (
                <div>
                    {this.state.data}
                    <div>
                        <Button onClick={this.startChat}>Start Chat</Button>
                    </div>
                </div>
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
                            <ListItem button key={text} onClick={() => {this.listOfGroupOnclick(text)}}>
                                <ListItemIcon>{<GroupIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['Allocate Map'].map((text) => (
                            <ListItem button key={text} >
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
                            {['Post Announcement'].map((text) => (
                            <ListItem button key={text} onClick={this.handleClickOpen}>
                                <ListItemIcon>{ <PostAddIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                            <Dialog open={this.state.dialogueOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Announcement</DialogTitle>
                                <DialogContent>
                                <DialogContentText>
                                    This announcement will be showed to all students
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Message"
                                    fullWidth
                                    onChange = {this.handleAnnouncement('announcement')}
                                />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.post} color="primary">
                                    Post
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </List>
                    </Drawer>
                    <Container maxWidth="sm">
                        <div className={classes.toolbar} />
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '50vh'}} >  
                            <Typography  paragraph>{data}</Typography>
                        </Typography>
                    </Container>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(AdminPage)
