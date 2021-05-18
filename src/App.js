import React, {Component} from 'react';
import Navigation from "./Components/Navigation";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
//CSS imports
import './App.css';
import './css/templatemo_style.css';

//Component links
import HomePage from "./Pages/HomePage";
import Login from './Forms/Login';

import C_Project from "./Forms/C_Project";
import C_User from "./Forms/C_User";
import D_Project from "./Forms/D_Project";
import D_User from "./Forms/D_User";
import U_Project from "./Forms/U_Project";
import U_Pages from "./Forms/U_Pages";

import AboutMe from "./Pages/AboutMe";
import Education from "./Pages/Education";
import Contact from "./Pages/Contact";
import Projects from "./Pages/Projects";
import SingleProject from "./Pages/SingleProject";

import pageNotFound from "./Pages/pageNotFound";
import PropTypes from "prop-types";

//Get .env values
require('dotenv').config();

class App extends Component {
  render(){
      return (
          <div className={"App"}>
              <Router>
                  <Navigation/>
                  <Switch>
                      <Route exact path={"/" } component={HomePage}/>
                      <Route exact path={"/home"} component={HomePage}/>
                      <Route path={"/login"} component={Login}/>

                      <Route path={"/create_project"} component={C_Project}/>
                      <Route path={"/add_user"} component={C_User}/>
                      <Route path={"/delete_project"} component={D_Project}/>
                      <Route path={"/delete_user"} component={D_User}/>
                      <Route path={"/update_project"} component={U_Project}/>
                      <Route path={"/update_page"} component={U_Pages}/>

                      <Route path={"/projects"} component={Projects}/>
                      <Route path={"/about"} component={AboutMe}/>
                      <Route path={"/education"} component={Education}/>
                      <Route path={"/contact"} component={() => <Contact env={this.props.env}/>}/>
                      <Route path={"/project/:projId"} component={SingleProject}/>

                      <Route component={pageNotFound}/>
                  </Switch>
              </Router>
          </div>
      );
  }
}
App.propTypes = {
    env: PropTypes.object.isRequired
};
export default App;
