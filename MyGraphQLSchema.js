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

const SpartanType = new GraphQLObjectType({
  name: 'Spartan',
  fields: () => ({
    Gamertag: { type: GraphQLString },
    ServiceTag: { type: GraphQLString },
  }),
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

//**************************************************** ACCESSING ARENA STATS */


const ArenaStatsType = new GraphQLObjectType({
  name: 'ArenaStats',
  fields: () => ({
    Id: { type: GraphQLString },
    ResultCode: { type: GraphQLInt},
    Result: { type: ArenaResultType },
  }),
});

const ArenaResultType = new GraphQLObjectType({
  name: 'ArenaResults',
  fields: () => ({
    ArenaStats: { type: PlayerArenaStats },
  }),
});

const PlayerArenaStats = new GraphQLObjectType({
  name: 'PlayerArenaStats',
  fields: () => ({
    HighestCsrAttained: { type: CsrStatsType },
    ArenaGameBaseVariantStats: { type: new GraphQLList(ArenaGameVariantType)}
  }),
});

const ArenaGameVariantType = new GraphQLObjectType({
  name: 'ArenaGameVariant',
  fields: () => ({
    GameBaseVariantId: { type: GraphQLString},
  }),
})

//**************************************************** NESTEDARENA STATS */


const CsrStatsType = new GraphQLObjectType({
  name: 'CsrStatsType',
  fields: () => ({
    Tier: { type: GraphQLInt },
    DesignationId: { type: GraphQLInt },
    PercentToNextTier: { type: GraphQLInt },
    
  })
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
  })
})


//**************************************************** WARZONE STATS */

const WarzoneType = new GraphQLObjectType({
  name: 'Warzone',
  fields: () => ({
    Result: { type: ResultType }
  })
})

const ResultType = new GraphQLObjectType({
  name: 'Result',
  fields: () => ({
    WarzoneStat: { type: WarzoneStatType },
  })
})

const WarzoneStatType = new GraphQLObjectType({
  name: 'WarzoneStat',
  fields: () => ({
    ScenarioStats: { type: new GraphQLList(ScenarioStatsType)},
    TotalKills: { type: GraphQLInt },
    TotalHeadshots: { type: GraphQLInt },
    TotalWeaponDamage: { type: GraphQLFloat },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    WeaponWithMostKills: {type: WeaponWithMostKillsType}
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
    FlexibleStats: { type: MedalStatCountsType },
    GameBaseVariantId: { type: GraphQLString },
    MapId: { type: GraphQLString }
  })
})

const MedalStatCountsType = new GraphQLObjectType({
  name: 'MedalStatCounts',
  fields: () => ({
    MedalStatCounts: { type: new GraphQLList(MedalTypes) }
  })
})

const MedalTypes = new GraphQLObjectType({
  name: 'Medal',
  fields: () => ({
    Id: { type: GraphQLString },
    Count: { type: GraphQLInt }
  })
})

//**************************************************** TEST QUERY */


// enum VehicleUsable {
//   true
//   false
// }

const VehicleObj = new GraphQLObjectType({
  name: 'Vehicle',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    largeIconImageUrl: { type: GraphQLString },
    isUsableByPlayer: { type: GraphQLBoolean },
    id: { type: GraphQLString },
    contentId: { type: GraphQLString },
  })
})

//**************************************************** ROOT QUERY */

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    vehicleMeta: {
      type: new GraphQLList(VehicleObj),
      args: { 
        isUsableByPlayer: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/vehicles`)
          .then(res => res.data)
          .then((vehicle) => vehicle.filter(vehi => vehi.isUsableByPlayer == args.isUsableByPlayer))
      }
    },
    mapMetadata: {
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
    spartan: {
      type: SpartanType,
      args: {
        player_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`profile/h5/profiles/${args.player_name}/appearance`)
          .then((res) => res.data);
      }      
    },
    arenaStats: {
      type: ArenaStatsType,
      args: {
        player_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/arena?players=${args.player_name}`)
          .then(res => res.data.Results[0]);
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
    warzoneStats: {
      type: WarzoneType,
      args: {
        player_name: {type: GraphQLString}
      },
      resolve(parent, args){
        return instance
          .get(`stats/h5/servicerecords/warzone?players=${args.player_name}`)
          .then(res => res.data.Results[0])
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});