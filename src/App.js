
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { __RouterContext } from 'react-router';
import disableScroll from 'disable-scroll';

export default class App extends Component {
  render() {
    disableScroll.off();
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/business"><News key="business" pagesize={10} country="in" category="business" /></Route>
            <Route exact path="/entertainment"><News key="entertainment" pagesize={10} country="in" category="entertainment" /></Route>
            <Route exact path="/general"><News key="general" pagesize={10} country="in" category="general" /></Route>
            <Route exact path="/health"><News key="health" pagesize={10} country="in" category="health" /></Route>
            <Route exact path="/science"><News key="science" pagesize={10} country="in" category="science" /></Route>
            <Route exact path="/sports"><News key="sports" pagesize={10} country="in" category="sports" /></Route>
            <Route exact path="/technology"><News key="technology" pagesize={10} country="in" category="technology" /></Route>
            <Route exact path="/"><News key="general" pagesize={10} country="in" category="general" /></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
