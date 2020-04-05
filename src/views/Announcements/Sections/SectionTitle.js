import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionTitle(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
        <div id="navigation-pills">
            <div className={classes.title}>
                <h1>Dashboard</h1>
            </div>
            <div className={classes.subtitle}>
                <h2>Capstone Group #{props.grp_no}</h2>
            </div>
        </div>
    </div>
  );
}
