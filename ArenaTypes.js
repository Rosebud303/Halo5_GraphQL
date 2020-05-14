const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');

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
    ArenaGameBaseVariantStats: { type: new GraphQLList(BestSeasonType) },
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

module.exports = {
  ArenaGameBasesType,
  CsrStatsType,
  ArenaStatsType
}