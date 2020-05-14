const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLID
} = require('graphql');

const WarzoneStatType = new GraphQLObjectType({
  name: 'WarzoneStat',
  fields: () => ({
    ScenarioStats: { type: new GraphQLList(ScenarioStatsType) },
    TotalKills: { type: GraphQLInt },
    TotalHeadshots: { type: GraphQLInt },
    TotalWeaponDamage: { type: GraphQLFloat },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    WeaponWithMostKills: { type: WeaponWithMostKillsType },
    MedalAwards: { type: new GraphQLList(MedalCountIdType) }
  })
})

const WeaponWithMostKillsType = new GraphQLObjectType({
  name: 'WeaponWithMostKills',
  fields: () => ({
    TotalKills: { type: GraphQLInt },
    TotalHeadShots: { type: GraphQLInt },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    TotalDamageDealt: { type: GraphQLFloat },
    WeaponId: { type: WeaponIdType },
  })
})

const WeaponIdType = new GraphQLObjectType({
  name: 'WeaponId',
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

module.exports = {
  WarzoneStatType,
  ScenarioStatsType
}