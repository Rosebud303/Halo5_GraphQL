import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Spinner from './Spinner/Spinner';
import { metadataQueryList } from './MetadataQueries/MetadataQueries';


export default function Testcomp() {

  return (
    <div>
      {
        metadataQueryList.map(metadata => {
          return localStorage[metadata.name] ? 
            console.log(`metadata for ${metadata.name} already exists`)
            : 
            <Query query={metadata.query}>
              {
                ({ loading, error, data }) => {
                  if(loading) return ''
                  if(error) console.log(error)
                  localStorage.setItem(`${metadata.name}`, JSON.stringify(data))
                  return ''
                } 
              }
            </Query>

        })
      }
    </div>
  )
}
