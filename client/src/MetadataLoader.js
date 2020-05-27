import React from "react";
import { Query } from "react-apollo";
import Spinner from "./Spinner/Spinner";
import { metadataQueryList } from "./MetadataQueries/MetadataQueries";

export default function MetadataLoader() {
  return (
    <div>
      {metadataQueryList.map((metadata) => {
        return localStorage[metadata.name] ? (
          console.log(`metadata for ${metadata.name} already exists`)
        ) : (
            <Query
              query={metadata.query}
              key={metadataQueryList.indexOf(metadata)}
            >
              {({ loading, error, data }) => {
                if (loading) return <Spinner name={metadata.name} />;
                if (error) console.log(error);
                localStorage.setItem(`${metadata.name}`, JSON.stringify(data));
                return "";
              }}
            </Query>
          );
      })}
    </div>
  );
}
