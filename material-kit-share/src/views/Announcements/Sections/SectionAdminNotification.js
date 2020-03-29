import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/notificationsStyles.js";

const useStyles = makeStyles(styles);


export default function SectionAdminNotification(argument) {
  const classes = useStyles();
  if(argument.isDisplay === true){
    return (
      <div className={classes.section} id="notifications">
        <div className={classes.container}>
        </div>
        <SnackbarContent
          message={
            <span>
              <b>ALERT:</b> You{"'"}ve got a new message from Admin. Which you{"'"}ll read from mongodb. Please refer to your dashboard for more information.
            </span>
          }
          close
          color="danger"
          icon="info_outline"
        />
        <Clearfix />
      </div>
    );
  }
  else{
    return (null);
  }
  


  // else {
  //   return (
  //     <div className={classes.section} id="notifications">
  //     <div className={classes.container}>
  //     </div>
  //     <SnackbarContent
  //       message={
  //         <span>
  //           <b>INFO ALERT:</b> You{"'"}ve no new messages.
  //         </span>
  //       }
  //       close
  //       color="info"
  //       icon="info_outline"
  //     />
  //     <Clearfix />
  //   </div>
  //   );
  // }
  
}
