import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import WelcomePage from "../WelcomePage/WelcomePage";
import Homepage from "../HomePage/Homepage";
import Detailspage from "../Detailspage/Detailspage";
import Arenapage from "../Arenapage/Arenapage";
import Warzonepage from "../Warzonepage/Warzonepage";
import MetadataLoader from "../../MetadataLoader";
import WarzoneVariant from "../WarzoneVariant/WarzoneVariant";
import MetadataPage from "../../components/MetadataPage/MetadataPage";

export default class App extends Component {
  render() {
    return (
      <>
        <div>
          <MetadataLoader />
          <Switch>
            <Route exact path='/' component={WelcomePage} />
            <Route exact path='/homepage' component={Homepage} />
            <Route exact path='/details' component={Detailspage} />
            <Route exact path='/arena' component={Arenapage} />
            <Route exact path='/warzone' component={Warzonepage} />
            <Route exact path='/warzone/variant' component={WarzoneVariant} />
            <Route exact path='/libraries' component={MetadataPage} />
          </Switch>
        </div>
      </>
    );
  }
}
