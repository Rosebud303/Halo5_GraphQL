import React, { Component } from 'react';
import axios from 'axios';
import api_key from './apikey';
import gql from 'graphql-tag';
import Testcomp from './Testcomp'

const proxyurl = "https://cors-anywhere.herokuapp.com/";



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
      <div>
        <img alt='image should be here but isnt it?' src={this.state.imageHere}/>
        <Testcomp />
      </div>
    )
  }
}

