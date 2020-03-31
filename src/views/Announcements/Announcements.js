import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";


// sections for this page
import SectionPills from "./Sections/SectionPills.js";
import SectionPadding from "./Sections/SectionPadding.js";
import SectionNotification from "./Sections/SectionNotification";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

var AdminMessageContent = "You have until 2359, 06 July to send your request. Do it soon!"
var AdminMessageTitle = "ADMIN: "
var AllocationMessageContent = "Your request has been sent. Allocation is still underway. Check by soon for any more announcements."
var AllocationMessageTitle = "ALERT: "
var url;
var chat;
// Possible colours are ["info","success","warning","danger","primary"], respectively [cyan, green, yellow, orange-red, purple].





export default function Components(props) {
  const classes = useStyles();


  return (
    <div>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionPadding/>

        <SectionNotification isDisplay={true} message_content={AdminMessageContent} message_title={AdminMessageTitle} colour="danger"/>
        <SectionNotification isDisplay={true} message_content={AllocationMessageContent} message_title={AllocationMessageTitle} colour="success"/>
        <SectionPills/>
        <Button color="primary" size="lg" simple onClick ={() => {
          var url;
          var chat;
          if(window.location.host == "localhost:5000") {
            url = "http://" + window.location.host;
          }
          else {
            url = "https://" + window.location.host;
          }
          chat = url + "/chat";
          console.log(`Click on {chat}`);
          window.location = chat;
        }}>
          Click Here to chat with the admin
        </Button>
      </div>

    </div>
  );
}
