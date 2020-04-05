import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Announcement from "@material-ui/icons/Announcement";
import FormatQuote from "@material-ui/icons/FormatQuote";
import Store from "@material-ui/icons/Store";
import QueuePlayNext from "@material-ui/icons/QueuePlayNext"

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

// imported Sections
import SectionRequestButton from "./SectionRequestButton.js"
import SectionChatButton from "./SectionChatButton.js"
import SectionCapstoneButton from "./SectionCapstoneButton.js"
import SectionTable from "./SectionTable"

import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";

const useStyles = makeStyles(styles);

var admin_announcements = "Please refer to the Admin's comments and update your request!"
var current_allocation_msg = "Guess we put the picture here. And then trigger a 'Notification Bar' when an allocation is given as well."


export default function SectionPills(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div id="navigation-pills">

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
                  tabButton: "Actions",
                  tabIcon: QueuePlayNext,
                  tabContent: (
                    <span>
                      <SectionRequestButton />
                      <SectionChatButton />
                      <SectionCapstoneButton />
                    </span>
                  )
                },
                {
                  tabButton: "Announcement",
                  tabIcon: Announcement,
                  tabContent: (
                    <span>
                      <p>
                        {admin_announcements}
                      </p>
                    </span>
                  )
                },
                {
                  tabButton: "Your Latest Request",
                  tabIcon: FormatQuote,
                  tabContent: (
                    <span>
                      <SectionTable data={props.messagejson}/>
                    </span>
                  )
                },
                {
                  tabButton: "Your Current Allocation",
                  tabIcon: Store,
                  tabContent: (
                    <span>
                      <p>
                        {current_allocation_msg}
                      </p>
                    </span>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
