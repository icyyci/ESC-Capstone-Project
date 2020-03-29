import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/notificationsStyles.js";

const useStyles = makeStyles(styles);

export default function SectionPadding() {
  const classes = useStyles();

  return (
    <div className={classes.section} id="notifications">
      <div className={classes.container}>
      </div>
      <SnackbarContent
        message={
          <span>    
          </span>
        }
        close
        color="transparent"
      />
      <Clearfix />
    </div>
  );

  
}
