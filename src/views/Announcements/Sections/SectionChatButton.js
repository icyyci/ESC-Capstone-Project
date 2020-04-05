import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
// core components
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionRequestButton() {
  const classes = useStyles();

  var url;
  if(window.location.host === "localhost:5000") {
    url = "http://" + window.location.host + "/chat";
  }
  else {
    url = "https://" + window.location.host + "/chat";
  }
  console.log(`Click on {url}`);

  return (
    <div className={classes.container}>

        <Button 
          color="google" 
          size="lg"
          fullWidth = {true}
          href={url}
        >
          <QuestionAnswer className={classes.icons} />
          Click Here to Chat with the Admin
        </Button>
    </div>
  );
}
