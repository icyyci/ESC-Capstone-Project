import React, {Component} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
      table: {
        minWidth: 450,
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
});


export class AdminPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            groupIDClicked:'',
            groupNoClicked: '',
            contentShow: false,
            drawerIsOpen: false,
            listOfGroups: [],
            groupNo: 0,
            data: [],
            url: '',
            dialogueOpen:false,
            announcement: '',
            dialogueOpenPrivate:false,
            dialogueOpenUnregister: false
        };
    }

    handleClickOpen = () => {
        this.setState({dialogueOpen:true});
    };

    handleClose = () => {
        this.setState({dialogueOpen:false});
    };

    handleClickOpenPrivate = () => {
        this.setState({dialogueOpenPrivate:true});
    };

    handleClosePrivate = () => {
        this.setState({dialogueOpenPrivate:false});
    };

    handleClickOpenUnregister = () => {
        this.setState({dialogueOpenUnregister:true});
    };

    handleCloseUnregister = () => {
        this.setState({dialogueOpenUnregister:false});
    };

    toggleSidebar = () => {
        this.setState({drawerIsOpen:!this.state.drawerIsOpen})
    }
    
    registerGroup = () => {
        var newGroupNo = this.state.groupNo + 1;
        this.setState({
            listOfGroups: this.state.listOfGroups.concat(['Group ' + newGroupNo]),
            groupNo: newGroupNo
        });
        window.location = this.state.url + "/admin/registergroup";
    }

    unregisterGroup = () => {
        axios.post(this.state.url + "/admin", {request:"unregister", group:this.state.groupNo}).then(res => {
            this.setState({listOfGroups: res.data});
        })
        this.handleCloseUnregister();
    }

    toggleContent = () => {
        this.setState({contentShow: true})     
    }

    displayData = (text) => {
        console.log("sending request");
        axios.post(this.state.url + "/admin", {request:"data", group:text}).then(res => {
            console.log(res.data);
            this.setState({data: res.data});
            this.setState({groupNoClicked: text});
            this.setState({contentShow: true});   
        });

    }

    allocateMap = () => {
        window.location = this.state.url + "/map";
    }

    listOfGroupOnclick = (text) => {
        this.setState({groupIDClicked: text});
        text = text.split(' ').join('').toLowerCase();
        this.updateGrpNoClicked(text);
        this.displayData(text);
        //delete later
        this.setState({contentShow:true})
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
        })
        this.state.announcement = "";
        this.handleClose();
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
    
    //START PRIVATE ANNOUNCEMENT WITH SPECIFIC GROUP use this.state.grpNoClicked
    privateAnnouncement = () => {
        console.log(this.state.anouncement + " to " + this.state.groupIDClicked);
        axios.post(this.state.url + "/admin", {request:"announcement", message:this.state.announcement, group:this.state.groupIDClicked}).then(res => {
            
        })
        this.state.announcement = "";
        this.handleClosePrivate();
    }
    
    createData = (name, content) => {
        return { name, content };
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
        const rows = [
            this.createData("Type of Prototype", this.state.data.typeOfPrototype),
            this.createData("Showcase Space Needed",this.state.data.showcaseSpaceNeeded),
            this.createData("Dimension of Prototype",this.state.data.dimensionOfPrototype),
            this.createData("Number of PowerPoints",this.state.data.noOfPowerPoints),
            this.createData("Number of pedestals",this.state.data.pedestals),
            this.createData("Other requests",this.state.data.otherRequests),
        ];
        if (this.state.contentShow){
            var data = (
                <div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>

                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.content}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <Button onClick={this.startChat}>Start Chat</Button>
                    </div>
                    <div>
                        <Button onClick={this.handleClickOpenPrivate}>Private Announcement</Button>
                        <Dialog open={this.state.dialogueOpenPrivate} onClose={this.handleClosePrivate} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Announcement to {this.state.groupIDClicked}</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                This is a private announcement
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
                            <Button onClick={this.handleClosePrivate} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.privateAnnouncement} color="primary">
                                Post
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            )
        }
        return (
            
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
                            <ListItem button key={text} onClick={this.allocateMap}>
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
                            <ListItem button key={text} onClick={this.handleClickOpenUnregister}>
                                <ListItemIcon>{ <EditIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                            <Dialog open={this.state.dialogueOpenUnregister} onClose={this.handleCloseUnregister} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Unregister Group</DialogTitle>
                                <DialogContent>
                                <DialogContentText>
                                    Enter the group number to unregister
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Group Number"
                                    fullWidth
                                    onChange = {this.handleAnnouncement('groupNo')}
                                />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={this.handleCloseUnregister} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.unregisterGroup} color="primary">
                                    Confirm
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </List>
                        <List>
                            {['Post Announcement'].map((text) => (
                            <ListItem button key={text} onClick={this.handleClickOpen}>
                                <ListItemIcon>{ <PostAddIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                            ))}
                            <Dialog open={this.state.dialogueOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Public Announcement</DialogTitle>
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
            
        );
    }
}

export default withStyles(styles)(AdminPage)
