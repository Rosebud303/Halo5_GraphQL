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
    TotalWeaponDamage: { type: GraphQLString },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    TotalGamesWon: { type: GraphQLInt },
    TotalGamesLost: { type: GraphQLInt },
    TotalGamesTied: { type: GraphQLInt },
    WeaponWithMostKills: { type: WeaponWithMostKillsType },
    MedalAwards: { type: new GraphQLList(MedalIdType) }
  })
})

const WeaponWithMostKillsType = new GraphQLObjectType({
  name: 'WeaponWithMostKills',
  fields: () => ({
    TotalKills: { type: GraphQLInt },
    TotalHeadshots: { type: GraphQLInt },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    TotalDamageDealt: { type: GraphQLFloat },
    WeaponId: { type: WeaponIdType }
  })
})

const WeaponIdType = new GraphQLObjectType({
  name: 'WeaponId',
  fields: () => ({
    StockId: { type: GraphQLID }
  })
})

const MedalIdType = new GraphQLObjectType({
  name: 'MedalId',
  fields: () => ({
    MedalId: { type: GraphQLID },
    Count: { type: GraphQLInt }
  })
})

// Game Variant Warzones

const ScenarioStatsType = new GraphQLObjectType({
  name: 'ScenarioStats',
  fields: () => ({
    GameBaseVariantId: { type: GraphQLString },
    MapId: { type: GraphQLString },
    TotalKills: { type: GraphQLInt },
    TotalHeadshots: { type: GraphQLInt },
    TotalWeaponDamage: { type: GraphQLFloat },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    TotalGamesWon: { type: GraphQLInt },
    TotalGamesLost: { type: GraphQLInt },
    TotalGamesTied: { type: GraphQLInt },
    WeaponWithMostKills: { type: GameVariantWeaponType },
    MedalAwards: { type: new GraphQLList(GameVariantMedalIdType) }
  })
})

const GameVariantWeaponType = new GraphQLObjectType({
  name: 'GameVariantWeapon',
  fields: () => ({
    TotalKills: { type: GraphQLInt },
    TotalHeadshots: { type: GraphQLInt },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    TotalDamageDealt: { type: GraphQLFloat },
    WeaponId: { type: GameVariantWeaponIdType }
  })
})

const GameVariantWeaponIdType = new GraphQLObjectType({
  name: 'GameVariantWeaponId',
  fields: () => ({
    StockId: { type: GraphQLID }
  })
})

const GameVariantMedalIdType = new GraphQLObjectType({
  name: 'GameVariantMedalId',
  fields: () => ({
    MedalId: { type: GraphQLID },
    Count: { type: GraphQLInt }
  })
})


module.exports = {
  WarzoneStatType,
  ScenarioStatsType
}