import React, { useEffect } from "react";
import { Paper, makeStyles } from "@material-ui/core";

import Sbarfrom from "./Sbarform.js";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: '10%',
    padding: '1%',
    paddingLeft:'20%',
  },
}));

export default function Sbar() {
  const classes = useStyles();
  return (
    <Paper className={classes.pageContent}>
      <Sbarfrom />
    </Paper>
  );
}
