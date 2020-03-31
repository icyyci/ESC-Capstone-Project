import React from "react";
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

const useStyles = makeStyles(styles);



export default function SectionPills(props) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
              <h1>Dashboard</h1>
          </div>
          <div className={classes.subtitle}>
              <h2>Capstone Group #2</h2>
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
                      <span>
                        <p>
                          Please refer to Admin's comments and update your request!
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
                          Guess we put the picture here. And then trigger a 'Notification Bar' when an allocation is given as well.
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
    </div>
  );
}
