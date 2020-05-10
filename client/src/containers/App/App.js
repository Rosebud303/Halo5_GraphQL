import React, { Component } from 'react';
import axios from 'axios';
import api_key from '../../apikey';
import proxyurl from '../../proxyurl';
import gql from 'graphql-tag';
import WelcomePage from '../WelcomePage/WelcomePage';
import { Route, Switch } from 'react-router-dom';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageHere: ''
    }
    
  }

  componentWillMount() {
    axios.create({
      headers: {'Ocp-Apim-Subscription-Key': api_key }
    })
      .get(proxyurl +`https://www.haloapi.com/profile/h5/profiles/daymanf0tnm/spartan`)
      .then(data => this.setState({imageHere: data.headers['x-final-url']}))
  }

  render() {
    return (
      <body>
        <Switch>
          <Route exact path='/welcome' component={WelcomePage} />

        </Switch>
      </body>
    )
  }
}

