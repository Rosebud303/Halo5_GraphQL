import React, { Component } from 'react';
import axios from 'axios';
import api_key from './apikey';
import gql from 'graphql-tag';
import Testcomp from './Testcomp'

const proxyurl = "https://cors-anywhere.herokuapp.com/";

let testing;


export default class App extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    axios.create({
      headers: {'Ocp-Apim-Subscription-Key': api_key }
    })
      .get(proxyurl +`https://www.haloapi.com/profile/h5/profiles/daymanf0tnm/spartan`)
      .then(data => console.log(data))
  }

  render() {
    return (
      <div>
        {/* {console.log(testing)} */}
        <img src={testing || ''}/>
        <Testcomp />
      </div>
    )
  }
}

