const api_key = require('./apikey');
const axios = require('axios');
const {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, Output, isNamedType, GraphQLEnumType, 
} = require('graphql');

const instance = axios.create({
  baseURL: 'https://www.haloapi.com/',
  headers: { 'Ocp-Apim-Subscription-Key': api_key },
});

const SpartanType = new GraphQLObjectType({
  name: 'Spartan',
  fields: () => ({
    Gamertag: { type: GraphQLString },
    ServiceTag: { type: GraphQLString },
    Testprop: { type: ArenaStatsType },
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
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
