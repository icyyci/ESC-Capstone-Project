import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LibraryAdd from "@material-ui/icons/LibraryAdd";
// core components
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionRequestButton() {
  const classes = useStyles();

  var url;
  if(window.location.host === "localhost:5000") {
    url = "http://" + window.location.host + "/user/request";
  }
  else {
    url = "https://" + window.location.host + "/user/request";
  }
  console.log(`Click on {url}`);

  return (
    <div className={classes.container}>
        <Button 
          color="warning" 
          size="lg"
          fullWidth = {true}
          href={url}
        >
          <LibraryAdd className={classes.icons} />
          Click Here to Submit a New Request
        </Button>
    </div>
  );
}
