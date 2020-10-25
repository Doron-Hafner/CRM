import React, {useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import { observer, inject } from 'mobx-react'
import Navbar from './components/navbar/Navbar'
import { CssBaseline } from '@material-ui/core';
import Clients from './components/clients/Clients';

const App = inject("ClientsStore")(observer(props => {
  useEffect(() => {
    (async () => await props.ClientsStore.fetchData() )
    ()
  }, [props.ClientsStore])
  return (
    <Router>
    <CssBaseline/>
      <Navbar />
        <Switch>
          <Route path='/' exact render={() => 'home'} />
          <Route path='/clients' render={() => <Clients/>} />
          <Route path='/actions' render={() => 'actions'} />
          <Route path='/analytics' render={() => 'analytics'} />
        </Switch>
    </Router>
  );
}))

export default App;
