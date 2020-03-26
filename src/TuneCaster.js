import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

//My own components
import "./TuneCaster.css";
import AppHost from "./components/host/AppHost";
import AppUser from "./components/user/AppUser";

export default class TuneCaster extends React.Component {
  render() {
    return (
      <div className="main">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={AppHost} />
            <Route exact path="/host:id" component={AppHost} />
            <Route path="/:id" component={AppUser} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
