import React from "react";
import { AppBar, Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    position: "relative",
    backgroundColor: "#303F9F",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
  },
});

const NavBar = () => {
  const classes = useStyle();
  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.text} variant="h4">
        Trello App in ReactJs
      </Typography>
    </Toolbar>
  );
};

export default NavBar;
