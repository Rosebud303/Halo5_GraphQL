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
  }, 
  {
    name: 'medalsMetadata',
    query: gql`
      query MedalsQuery {
        medalsMetadata {
          name
          description
          classification
          difficulty
          id
          contentId
          spriteLocation {
            spriteSheetUri
            left
            top
          }
        }
      }
    `
  },
  {
    name: 'gameBaseVariantsMetadata',
    query: gql`
      query GameVariantsQuery {
        gameBaseVariantsMetadata {
          name
          iconUrl
          id
        }
      }
    `
  },
  {
    name: 'weaponsMetadata',
    query: gql`
      query WeaponsQuery {
        weaponsMetadata {
          name
          largeIconImageUrl
          id
        }
      }
    `
  },
  {
    name: 'flexibleStatsMetadata',
    query: gql `
      query FlexibleStatsQuery {
        flexibleStatsMetadata {
          name
          id
        }
      }
    `
  },
  {
    name: 'impulsesMetadata',
    query: gql `
      query ImpulsesQuery {
        impulsesMetadata {
          internalName
          id
        }
      }
    `
  },
  {
    name: 'seasonsMetadata',
    query: gql `
      query SeasonsQuery {
        seasonsMetadata {
          playlists{
            name
            description
            id
          }
          name
          id
        }
      }
    `
  }
]