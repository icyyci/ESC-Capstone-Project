import React from "react";
// nodejs library that concatenates classes
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  return (
    <div>
      <Link to={"/announcements"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              Click Here to go to Announcements Page
            </Button>
      </Link>
    </div>
  );
}
