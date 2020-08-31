import React from 'react';
import { Query } from 'react-apollo';
import Spinner from './Spinner/Spinner';
// import { metadataQueryList } from './Queries/MetadataQueries';

export default function MetadataLoader({ metadataSet }) {
  return (
    <div>
      {metadataSet.map((metadata) => {
        return localStorage[metadata.name] ? (
          console.log(`metadata for ${metadata.name} already exists`)
        ) : (
            <Query
              query={metadata.query}
              key={metadataSet.indexOf(metadata)}
            >
              {({ loading, error, data }) => {
                if (loading) return <Spinner name={metadata.name} />;
                if (error) console.log(error);
                localStorage.setItem(`${metadata.name}`, JSON.stringify(data[metadata.name]));
                return '';
              }}
            </Query>
          );
      })}
    </div>
  );
}
