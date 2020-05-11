import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Spinner from './Spinner/Spinner';
import { CSR_QUERY } from './MetadataQueries/MetadataQueries';




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
      <Query query={CSR_QUERY}>
        {
          (
            { loading, error, data }) => {
              if(loading) return <p>loading...</p>
              if(error) console.log(error)
              console.log(data)
              localStorage.setItem("csrMetadata", JSON.stringify(data))
              return <p>test</p>
          }
        }
      </Query>
      
    </div>
  )
}
