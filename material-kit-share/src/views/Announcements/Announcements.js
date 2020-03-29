import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components

// sections for this page
import SectionPills from "./Sections/SectionPills.js";
import SectionPadding from "./Sections/SectionPadding.js";
import SectionAdminNotification from "./Sections/SectionAdminNotification"
import SectionAllocationNotification from "./Sections/SectionAllocationNotification"


import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  return (
    <div>


      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionPadding/>

        <SectionAdminNotification isDisplay={true}/>
        <SectionAllocationNotification isDisplay={true}/>
        <SectionPills />

      </div>

    </div>
  );
}
