const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

//**************************************************** MAP METADATA */

const MapMetadataType = new GraphQLObjectType({
  name: 'MapMetadata',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    supportedGameModes: { type: new GraphQLList(GraphQLString) },
    imageUrl: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})

//**************************************************** CSR METADATA */

const CsrMetadataType = new GraphQLObjectType({
  name: 'CsrMetadata',
  fields: () => ({
    name: { type: GraphQLString },
    bannerImageUrl: { type: GraphQLString },
    id: { type: GraphQLString },
    tiers: { type: new GraphQLList(TierListType) },
  }),
})

const TierListType = new GraphQLObjectType({
  name: 'TierList',
  fields: () => ({
    iconImageUrl: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})


//**************************************************** SEASONS METADATA */

const SeasonsMetadataType = new GraphQLObjectType({
  name: 'SeasonsMetadata',
  fields: () => ({
    playlists: { type: new GraphQLList(PlaylistType) },
    name: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})

const PlaylistType = new GraphQLObjectType({
  name: 'Playlist',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})

//**************************************************** FLEXIBLE STATS METADATA */

const FlexibleStatsMetadataType = new GraphQLObjectType({
  name: 'FlexibleStatsMetadata',
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})

//**************************************************** IMPULSES METADATA */

const ImpulsesMetadataType = new GraphQLObjectType({
  name: 'ImpulsesMetadata',
  fields: () => ({
    internalName: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})
const WeaponType = new GraphQLObjectType({
  name: 'Weapon',
  fields: () => ({
    name: { type: GraphQLString },
    largeIconImageUrl: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})

//**************************************************** GAME BASE VARIANTS */

const GameBaseVariantType = new GraphQLObjectType({
  name: 'GameBaseVariant',
  fields: () => ({
    name: { type: GraphQLString },
    iconUrl: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})

//**************************************************** Medals */

const MedalType = new GraphQLObjectType({
  name: 'Medals',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    classification: { type: GraphQLString },
    difficulty: { type: GraphQLInt },
    id: { type: GraphQLString },
    contentId: { type: GraphQLString },
    spriteLocation: { type: SpriteLocationType },
  })
})

const SpriteLocationType = new GraphQLObjectType({
  name: 'SpriteLocationUrl',
  fields: () => ({
    spriteSheetUri: { type: GraphQLString },
    left: { type: GraphQLInt },
    top: { type: GraphQLInt },
  }),
})

module.exports = { 
  WeaponType, 
  MapMetadataType, 
  CsrMetadataType, 
  SeasonsMetadataType,
  FlexibleStatsMetadataType, 
  ImpulsesMetadataType, 
  GameBaseVariantType, 
  MedalType 
}