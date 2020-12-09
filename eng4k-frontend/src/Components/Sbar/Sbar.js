import React, { useEffect } from "react";
import { Paper, makeStyles } from "@material-ui/core";

import Sbarfrom from "./Sbarform.js";

const styles = () => ({
  root: { borderRadius: 20, borderColor: "#000", padding: 50 },
});

const useStyles = makeStyles((theme) => ({
  pageContent: {
    "& .MuiPaper-elevation1": {},
    margin: "15rem 5% 5% 5%",
    padding: "0.5%",
    paddingLeft: "15%",
  },
}));

export default function Sbar() {
  const classes = useStyles();
  return (
    <Paper className={classes.pageContent} elevation={4}>
      <Sbarfrom />
    </Paper>
  );
}
