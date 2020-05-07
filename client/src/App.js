import React, { Component } from 'react';
import axios from 'axios';
import api_key from './apikey';
import gql from 'graphql-tag';
import Testcomp from './Testcomp'


export default class App extends Component {
  render() {
    return (
      <div>
        <Testcomp />
      </div>
    )
  }
}

