import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";

// @material-ui/icons
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";

// sections for this page
import SectionPadding from "./Sections/SectionPadding.js";
import SectionTitle from "./Sections/SectionTitle.js"
import SectionPills from "./Sections/SectionPills.js";

import SectionNotification from "./Sections/SectionNotification";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

var AdminMessageContent = "You have until 2359, 06 July to send your request. Do it soon!"
var AdminMessageTitle = "ADMIN: "
var AllocationMessageContent = "Your group's request has been sent. Allocation is still underway. Check by soon for any more announcements."
var AllocationMessageTitle = "ALERT: "
var url;
var chat;
// Possible colours are ["info","success","warning","danger","primary"], respectively [cyan, green, yellow, orange-red, purple].

var capstone_grp_number = "XXX"

// var request = 
// [
//   {'Floor Space (m2)': 5},
//   {'No. of Plugs': 2},
//   {'No. of Screens': 1},
//   {'Require Outdoor Exhibition': 'False'},
//   {'Special Request': 'None'},
//   {'Yeah Yeah': 'Papaya'},
//   {'Blah Blah': 'Watermelon'}
// ]

// An undefined request. Upon attempt on rendering the table, it will detect that the request is undefined, and will output a simple message instead, instead of throwing an error.
var request


export default function Components(props) {
  const classes = useStyles();

  return (
    <div>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionPadding/>
        <SectionNotification isDisplay={true} message_content={AdminMessageContent} message_title={AdminMessageTitle} colour="danger"/>
        <SectionNotification isDisplay={true} message_content={AllocationMessageContent} message_title={AllocationMessageTitle} colour="success"/>
        <SectionTitle grp_no={capstone_grp_number} />
        
        <SectionPills messagejson={request}/>
      </div>

    </div>
  );
}
