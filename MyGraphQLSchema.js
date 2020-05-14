const api_key = require('./client/src/apikey');
const axios = require('axios');
const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID
} = require('graphql');

//**************************************************** RE-USED INSTANCE VARIABLES */

const instance = axios.create({
  baseURL: 'https://www.haloapi.com/',
  headers: { 'Ocp-Apim-Subscription-Key': api_key },
});

const instanceWithAcceptedLanguage = axios.create({
  baseURL: 'https://www.haloapi.com/',
  headers: {  'Accept-Language': 'en', 'Ocp-Apim-Subscription-Key': api_key }
});

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
    tiers: { type: new GraphQLList(TierListType)},
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

//**************************************************** GAME BASE VARIANTS */

const GameBaseVariantType = new GraphQLObjectType({
  name: 'GameBaseVariant',
  fields: () => ({
    name: { type: GraphQLString },
    iconUrl: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})

//**************************************************** WEAPONS */

const WeaponType =  new GraphQLObjectType({
  name: 'Weapon',
  fields: () => ({
    name: { type: GraphQLString },
    largeIconImageUrl: { type: GraphQLString },
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
    spriteLocation: {type: SpriteLocationType},
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

//**************************************************** ARENA STATS */

const ArenaGameBasesType = new GraphQLObjectType({
  name: 'ArenaGameBases',
  fields: () => ({
    GameBaseVariantId: { type: GraphQLString },
  }),
})

const CsrStatsType = new GraphQLObjectType({
  name: 'CsrStats',
  fields: () => ({
    HighestCsrAttained: { type: HighestCsrType },
    ArenaGameBaseVariantStats: { type: new GraphQLList(BestSeasonType)},
  }),
})

const HighestCsrType = new GraphQLObjectType({
  name: 'HighestCsr',
  fields: () => ({
    Tier: { type: GraphQLInt },
    DesignationId: { type: GraphQLInt },
    PercentToNextTier: { type: GraphQLInt },
  }),
})

// NEED TO RESOLVE CSR DATA TYPE BELOW============
const BestSeasonType = new GraphQLObjectType({
  name: 'BestSeason',
  fields: () => ({
    HighestCsrPlaylistId: { type: GraphQLString },
    HighestCsrSeasonId: { type: GraphQLString },
    ArenaPlaylistStatsSeasonId: { type: GraphQLString },
  }),
})
//================================================

const ArenaStatsType = new GraphQLObjectType({
  name: 'ArenaStats',
  fields: () => ({
    TotalKills: { type: GraphQLString },
    TotalDeaths: { type: GraphQLString },
  }),
})


//**************************************************** WARZONE STATS */

const WarzoneStatType = new GraphQLObjectType({
  name: 'WarzoneStat',
  fields: () => ({
    ScenarioStats: { type: new GraphQLList(ScenarioStatsType)},
    TotalKills: { type: GraphQLInt },
    TotalHeadshots: { type: GraphQLInt },
    TotalWeaponDamage: { type: GraphQLFloat },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    WeaponWithMostKills: {type: WeaponWithMostKillsType},
    MedalAwards: { type: new GraphQLList(MedalCountIdType) }
  })
})

const WeaponWithMostKillsType = new GraphQLObjectType({
  name:'WeaponWithMostKills',
  fields: () => ({
    TotalKills: { type: GraphQLInt },
    TotalHeadShots: { type: GraphQLInt},
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt},
    TotalDamageDealt: { type: GraphQLFloat },
    WeaponId: { type: WeaponIdType },
  })
})

const WeaponIdType = new GraphQLObjectType({
  name:'WeaponId',
  fields: () => ({
    StockId: { type: GraphQLID }
  })
})

const ScenarioStatsType = new GraphQLObjectType({
  name: 'ScenarioStats',
  fields: () => ({
    GameBaseVariantId: { type: GraphQLString },
    MapId: { type: GraphQLString }
  })
})

const MedalCountIdType = new GraphQLObjectType({
  name: 'MedalStatCounts',
  fields: () => ({
    MedalId: { type: GraphQLID },
    Count: { type: GraphQLInt }
  })
})

//**************************************************** ROOT QUERY */

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    mapsMetadata: {
      type: new GraphQLList(MapMetadataType),
      resolve() {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/maps`)
          .then(res => res.data)
      }
    },
    csrMetadata: {
      type: new GraphQLList(CsrMetadataType),
      resolve() {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/csr-designations`)
          .then(res => res.data)
      }
    },
    seasonsMetadata: {
      type: new GraphQLList(SeasonsMetadataType),
      resolve() {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/seasons`)
          .then(res => res.data)
      }
    },
    flexibleStatsMetadata: {
      type: new GraphQLList(FlexibleStatsMetadataType),
      resolve() {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/flexible-stats`)
          .then(res => res.data)
      }
    },
    impulsesMetadata: {
      type: new GraphQLList(ImpulsesMetadataType),
      resolve() {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/impulses`)
          .then(res => res.data)
      }
    },
    gameBaseVariantsMetadata: {
      type: new GraphQLList(GameBaseVariantType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/game-base-variants')
          .then(res => res.data)
      }
    },
    weaponsMetadata: {
      type: new GraphQLList(WeaponType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/weapons')
          .then(res => res.data)
      }
    },
    medalsMetadata: {
      type: new GraphQLList(MedalType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/medals')
          .then(res => res.data)
      }
    },
    

    arenaGameBases: {
      type: new GraphQLList(ArenaGameBasesType),
      args: {
        player_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/arena?players=${args.player_name}`)
          .then(res => res.data.Results[0].Result.ArenaStats.ArenaGameBaseVariantStats)
      },
    },
    csrStats: {
      type: CsrStatsType,
      args: {
        player_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/arena?players=${args.player_name}`)
          .then(res => res.data.Results[0].Result.ArenaStats)
      },
    },
    arenaStats: {
      type: ArenaStatsType,
      args: {
        player_name: { type: GraphQLString },
        GameBaseVariantId: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/arena?players=${args.player_name}`)
          .then(res => res.data.Results[0].Result.ArenaStats.ArenaGameBaseVariantStats)
          .then(data => data.find(specificVariant => specificVariant.GameBaseVariantId === args.GameBaseVariantId))
      },
    },


    warzoneStats: {
      type: WarzoneStatType,
      args: {
        player_name: {type: GraphQLString}
      },
      resolve(parent, args){
        return instance
          .get(`stats/h5/servicerecords/warzone?players=${args.player_name}`)
          .then(res => res.data.Results[0].Result.WarzoneStat)
      }
    },
    scenarioStats: {
      type: ScenarioStatsType,
      args: {
        player_name: {type: GraphQLString},
        GameBaseVariantId: {type: GraphQLString}
      },
      resolve(parent, args){
        return instance
          .get(`stats/h5/servicerecords/warzone?players=${args.player_name}`)
          .then(res => res.data.Results[0].Result.WarzoneStat.ScenarioStats)
          .then(data => data.filter(item => item.GameBaseVariantId == args.GameBaseVariantId)[0])
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});