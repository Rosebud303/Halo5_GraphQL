import gql from 'graphql-tag';

export const metadataQueryList = [
  {
    name: 'csrMetadata',
    query: gql`  
      query CsrQuery {
        csrMetadata {
          name
          bannerImageUrl
          id
          tiers {
            iconImageUrl
            id
          }
        }
      }
    `
  },
  {
    name: 'mapsMetadata',
    query: gql`
      query MapQuery {
        mapMetadata {
          name
          description
          supportedGameModes
          imageUrl
          id
        }
      }
    `
  } 
]

//GameBaseVariant, Medals, Weapons, 