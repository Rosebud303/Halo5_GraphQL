import gql from "graphql-tag";
import React from 'react'


export const metadataQueryListA = [
  {
    name: "mapsMetadata",
    query: gql`
      query MapQuery {
        mapsMetadata {
          name
          description
          supportedGameModes
          imageUrl
          id
        }
      }
    `,
  },
  {
    name: "medalsMetadata",
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
    `,
  },
  {
    name: "gameBaseVariantsMetadata",
    query: gql`
      query GameVariantsQuery {
        gameBaseVariantsMetadata {
          name
          iconUrl
          id
        }
      }
    `,
  },
  {
    name: "weaponsMetadata",
    query: gql`
      query WeaponsQuery {
        weaponsMetadata {
          name
          largeIconImageUrl
          id
          type
        }
      }
    `,
  },
  {
    name: "seasonsMetadata",
    query: gql`
      query SeasonsQuery {
        seasonsMetadata {
          playlists {
            name
            description
            id
          }
          name
          id
        }
      }
    `,
  }
];

export const metadataQueryListB = [
  {
    name: "campaignsMetadata",
    query: gql`
      query CampaignsQuery {
        campaignsMetadata {
          missionNumber
          name
          description
          imageUrl
          type
          id
        }
      }
    `,
  },
  {
    name: "vehiclesMetadata",
    query: gql`
      query VehiclesQuery {
        vehiclesMetadata {
          name
          description
          largeIconImageUrl
          id
        }
      }
    `,
  },
  {
    name: "skullsMetadata",
    query: gql`
      query SkullsQuery {
        skullsMetadata {
          name
          description
          imageUrl
          missionId
          id
        }
      }
    `,
  },
  {
    name: "enemiesMetadata",
    query: gql`
      query EnemiesQuery {
        enemiesMetadata {
          faction
          name
          description
          largeIconImageUrl
          id
        }
      }
    `,
  }
]
