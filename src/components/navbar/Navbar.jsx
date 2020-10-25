import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor:'#0a1612'
  },
  menuButton: {
    margin: theme.spacing(1),
    color:'#FFF',
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
  },
  active: {
    color: 'tomato',
  }
}));

const Navbar = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
            <div className={classes.headerOptions}>
              <Button
                component= { NavLink }
                underline = 'hover'
                to='/clients'
                activeClassName={classes.active}
                className={classes.menuButton}
              >
                clients
              </Button>
              <Button
                component= { NavLink }
                to='/actions'
                activeClassName={classes.active}
                className={classes.menuButton}
              >
                actions
              </Button>
              <Button
                component= { NavLink }
                to='/analytics'
                activeClassName={classes.active}
                className={classes.menuButton}
              >
                analytics
              </Button>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}


export default Navbar;
