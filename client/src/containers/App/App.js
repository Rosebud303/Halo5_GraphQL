import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage';
import Homepage from '../HomePage/Homepage';
import Detailspage from '../Detailspage.scss/Detailspage';
import Arenapage from '../Arenapage/Arenapage';
import Warzonepage from '../Warzonepage/Warzonepage';
import MetadataLoader from '../../MetadataLoader';
import WarzoneFireFight from '../WarzoneFireFight/WarzoneFireFight';
import WarzoneAssault from '../WarzoneAssault/WarzoneAssault';
import WarzoneRegular from '../WarzoneRegular/WarzoneRegular';




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
            <Route exact path='/warzone/firefight' component={WarzoneFireFight} />
            <Route exact path='/warzone/assault' component={WarzoneAssault} />
            <Route exact path='/warzone/regular' component={WarzoneRegular} />
          </Switch>
        </div>
      </>
    )
  }
}

