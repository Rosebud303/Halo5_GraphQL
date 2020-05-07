import React, { Component } from 'react';
import axios from 'axios';
import api_key from './apikey';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const SPARTAN_QUERY = gql`
query SpartanQuery{
  spartan(player_name: "daymanf0tnm") {
  GamerTag
  ServiceTag
  }
}
`

export default class App extends Component {

testFunction = () => {
    return axios.create({
      baseURL: 'https://www.haloapi.com/',
      headers: {'Ocp-Apim-Subscription-Key': api_key }
    })
      .get(`profile/h5/profiles/daymanf0tnm/spartan`)
      .then(res => res.json())
      // .then(data => console.log(data))
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          {/* <img alt='image here' src={this.testFunction()}/> */}
          <Query query={SPARTAN_QUERY}>
            {
              ({loading,error,data}) => {
                if(loading) return <p>loading...</p>
                if(error) console.log(error)
                console.log(data)
                return <p>test</p>
              }
            }
          </Query>
        </div>
      </ApolloProvider>
    )
  }
}

