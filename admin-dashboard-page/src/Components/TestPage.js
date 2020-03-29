import React, { Component } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Sidebar from "react-sidebar";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

export class Testpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: true
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      }
     
      onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
      }
     
      render() {
        return (
          <MuiThemeProvider>
            <React.Fragment>
              <Sidebar
                  sidebar={
                  <b>
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                    >Group 1</Button>
                    <br />
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                    >Group 2</Button>
                    <br />
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                    >Group 3</Button>
                    <br />
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                    >Group 4</Button>
                    <br />
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                    >Group 5</Button>
                    <br />
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                    >Group 6</Button>
                    <br />
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                    >Group 7</Button>
                    <br />
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                    >Group 7</Button>
                    <br />
                    <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                    >Group 8</Button>
                  </b>}
                  open={this.state.sidebarOpen}
                  onSetOpen={this.onSetSidebarOpen}
                  styles={{ sidebar: { background: "white" } }}
              >
              </Sidebar>
              <AppBar position="static">
              <Toolbar>
                  <IconButton edge="start" className={Testpage.menuButton} color="inherit" aria-label="menu" onClick={() => this.onSetSidebarOpen(true)}>
                  <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={Testpage.title}>
                  AdminPage
                  </Typography>
                  
              </Toolbar>
              </AppBar>

            </React.Fragment>
          </MuiThemeProvider>
            
        );
      }
}

export default Testpage
