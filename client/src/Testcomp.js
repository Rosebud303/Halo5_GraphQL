import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const MEDAL_QUERY = gql`
  query MedalQuery($player_name: String!){
    spartan(player_name: $player_name){
      Gamertag
      ServiceTag
    }
  }
`;

let player_name = "daymanf0tnm"

export default function Testcomp() {
  return (
    <div>
      <Query query={MEDAL_QUERY} variables={{ player_name }}>
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
  )
}
