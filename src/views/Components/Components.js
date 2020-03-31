import React from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Announcement from "@material-ui/icons/Announcement";
import FormatQuote from "@material-ui/icons/FormatQuote";
import Store from "@material-ui/icons/Store";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import SectionTable from "./SectionTable"

import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";
import { Component } from 'react'
import {withStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(styles);

export class SectionPills extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
	   url: "",
	   capstoneGrp: "",
       dataAnnouncement: 'fetch announcement here',
       dataCurrentAllocation: 'fetch current allocation map here',
       dataLatestRequest: [ ]
    }
  }

  useStyles = () => {
    return useStyles();
  }

  
  //FUNCTIONS TO FETCH DATA FROM SERVER COMPONENTDIDMOUNT OR WTV => DO this.setstate({dataLatestRequest: newdata})
	componentDidMount() {
	if (window.location.host == "localhost:5000") {
		this.state.url = "http://" + window.location.host;
	}
	else {
		this.state.url = "https://" + window.location.host;
	}

		axios.post(this.state.url + "/user", {request:"firstload"}).then(res => {
		console.log(res.data.groupRequest);
		this.state.capstoneGrp = "Capstone " + res.data.groupNumber;
		var dataJson = res.data.groupRequest;
		var dataRequest = [];
		var index = 0;
		var keyArray = ["Type of Prototype:", "Showcase Space Needed:",
		"Size and Weight of Physical Prototype:",
		"No. of Power Points Needed:",
		"Pedestal(s):",
		"Other Requests:"
	]
	for (var i in dataJson) {
		var val = dataJson[i];
		var key = keyArray[index];
		index++;
		var newJson = { };
		newJson[key] = val;
		dataRequest.push(newJson);
	}
	this.setState({dataLatestRequest: dataRequest});
	console.log(this.state.dataLatestRequest);
	})
  }
 
  
  render() {

    const classes = this.useStyles;
    var dataAnnouncement = (
      <span>
        <p>
          {this.state.dataAnnouncement}
        </p>
      </span>
    )

    var dataCurrentAllocation = (
      <span>
        <p>
          {this.state.dataCurrentAllocation}
        </p>
      </span>
    )

    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <div id="navigation-pills">
            <div className={classes.title}>
                <h1>Dashboard</h1>
            </div>
            <div className={classes.subtitle}>
                <h2>{this.state.capstoneGrp}</h2>
            </div>
  
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <NavPills
                  color="rose"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 4, md: 4 },
                    contentGrid: { xs: 12, sm: 8, md: 8 }
                  }}
                  tabs={[
                    {
                      tabButton: "Announcement",
                      tabIcon: Announcement,
                      tabContent: (
                        dataAnnouncement
                      )
                    },
                    {
                      tabButton: "Your Latest Request",
                      tabIcon: FormatQuote,
                      tabContent: (
                        <span>
                          <SectionTable data={this.state.dataLatestRequest}/>
                        </span>
                      )
                    },
                    {
                      tabButton: "Your Current Allocation",
                      tabIcon: Store,
                      tabContent: (
                        dataCurrentAllocation
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SectionPills)
