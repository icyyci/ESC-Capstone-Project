

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import School from "@material-ui/icons/School";
// core components
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionRequestButton() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <Button 
          color="danger" 
          size="lg"
          fullWidth = {true}
          href="https://www.sutd.edu.sg/Capstone"
          target="_blank" // this line makes it such that link opens on new tab, rather than leaving current page.
        >
          <School className={classes.icons} />
          Click Here to go to SUTD Capstone Page
        </Button>
    </div>
  );
}




