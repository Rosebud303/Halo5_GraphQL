import gql from 'graphql-tag';

export const CSR_QUERY = gql`
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