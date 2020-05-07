const api_key = require('./client/src/apikey');
const axios = require('axios');
const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, GraphQLList, 
  GraphQLSchema
} = require('graphql');

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
  }),
});

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
    smallIconImageUrl: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
})

//**************************************************** Medals */

const MedalType = new GraphQLObjectType({
  name: 'Medals',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    difficulty: { type: GraphQLInt },
    id: { type: GraphQLString },
    spriteLocation: {type: SpriteLocationType}
  })
})

const SpriteLocationType = new GraphQLObjectType({
  name: 'SpriteLocationUrl',
  fields: () => ({
    spriteSheetUri: { type: GraphQLString },
    left: { type: GraphQLInt },
    top: { type: GraphQLInt },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    spriteWidth: { type: GraphQLInt },
    spriteHeight: { type: GraphQLInt }
  })
})


//**************************************************** WARZONE STATS */

const WarzoneType = new GraphQLObjectType({
  name: 'Warzone',
  fields: () => ({
    Result: { type: WarzoneStatType }
  })
})

const WarzoneStatType = new GraphQLObjectType({
  name: 'WarzoneStat',
  fields: () => ({
    WarzoneStat: { type: TotalPiesType }
  })
})

const TotalPiesType = new GraphQLObjectType({
  name: 'TotalPies',
  fields: () => ({
    TotalPiesEarned: { type: GraphQLInt },
    ScenarioStats: { type: new GraphQLList(FlexibleStatsType)}
  })
})

const FlexibleStatsType = new GraphQLObjectType({
  name: 'test',
  fields: () => ({
    TotalPiesEarned: { type: GraphQLInt },
    FlexibleStats: { type: MedalStatCountsType }
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

//**************************************************** ROOT QUERY */

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
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
    gameBaseVariants: {
      type: new GraphQLList(GameBaseVariantType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/game-base-variants')
          .then(res => res.data)
      }
    },
    weapons: {
      type: new GraphQLList(WeaponType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/weapons')
          .then(res => res.data)
      }
    },
    medals: {
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