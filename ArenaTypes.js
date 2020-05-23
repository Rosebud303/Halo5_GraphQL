const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const ArenaGameBasesType = new GraphQLObjectType({
  name: "ArenaGameBases",
  fields: () => ({
    GameBaseVariantId: { type: GraphQLString },
  }),
});

const CsrStatsType = new GraphQLObjectType({
  name: "CsrStats",
  fields: () => ({
    HighestCsrAttained: { type: HighestCsrType },
    HighestCsrPlaylistId: { type: GraphQLString },
    HighestCsrSeasonId: { type: GraphQLString },
    ArenaPlaylistStatsSeasonId: { type: GraphQLString },
  }),
});

const HighestCsrType = new GraphQLObjectType({
  name: "HighestCsr",
  fields: () => ({
    Tier: { type: GraphQLInt },
    DesignationId: { type: GraphQLInt },
    PercentToNextTier: { type: GraphQLInt },
  }),
});

const ArenaStatsType = new GraphQLObjectType({
  name: "ArenaStats",
  fields: () => ({
    TotalGamesWon: { type: GraphQLInt },
    TotalGamesLost: { type: GraphQLInt },
    TotalGamesTied: { type: GraphQLInt },
    TotalGamesCompleted: { type: GraphQLInt },
    TotalKills: { type: GraphQLInt },
    TotalDeaths: { type: GraphQLInt },
    TotalAssists: { type: GraphQLInt },
    WeaponWithMostKills: { type: TopWeaponType },
    TotalAssassinations: { type: GraphQLInt },
    TotalMeleeKills: { type: GraphQLInt },
    TotalGroundPoundKills: { type: GraphQLInt },
    TotalShoulderBashKills: { type: GraphQLInt },
    TotalGrenadeKills: { type: GraphQLInt },
    TotalPowerWeaponKills: { type: GraphQLInt },
    TotalHeadshots: { type: GraphQLInt },
    TotalWeaponDamage: { type: GraphQLString },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    Impulses: { type: new GraphQLList(ArenaImpulseType) },
    MedalAwards: { type: new GraphQLList(ArenaMedalType) },
    FlexibleStats: { type: ArenaFlexibleStatsType },
  }),
});

const AccumulativeArenaStatsType = new GraphQLObjectType({
  name: "AccumulativeArenaStats",
  fields: () => ({
    TotalGamesWon: { type: GraphQLInt },
    TotalGamesLost: { type: GraphQLInt },
    TotalGamesTied: { type: GraphQLInt },
    TotalGamesCompleted: { type: GraphQLInt },
    TotalKills: { type: GraphQLInt },
    TotalDeaths: { type: GraphQLInt },
    TotalAssists: { type: GraphQLInt },
    TopGameBaseVariants: { type: new GraphQLList(TopVariantsType) },
    WeaponWithMostKills: { type: TopWeaponType },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
    TotalAssassinations: { type: GraphQLInt },
    TotalMeleeKills: { type: GraphQLInt },
    TotalGroundPoundKills: { type: GraphQLInt },
    TotalShoulderBashKills: { type: GraphQLInt },
  }),
});

const TopVariantsType = new GraphQLObjectType({
  name: "TopVariants",
  fields: () => ({
    GameBaseVariantId: { type: GraphQLString },
    GameBaseVariantRank: { type: GraphQLString },
    NumberOfMatchesWon: { type: GraphQLString },
  }),
});

const TopWeaponType = new GraphQLObjectType({
  name: "TopWeapon",
  fields: () => ({
    WeaponId: { type: TopWeaponIdType },
    TotalKills: { type: GraphQLInt },
    TotalDamageDealt: { type: GraphQLString },
    TotalShotsFired: { type: GraphQLInt },
    TotalShotsLanded: { type: GraphQLInt },
  }),
});

const TopWeaponIdType = new GraphQLObjectType({
  name: "TopWeaponId",
  fields: () => ({
    StockId: { type: GraphQLString },
  }),
});

const ArenaImpulseType = new GraphQLObjectType({
  name: "ArenaImpulse",
  fields: () => ({
    Id: { type: GraphQLString },
    Count: { type: GraphQLInt },
  }),
});

const ArenaMedalType = new GraphQLObjectType({
  name: "ArenaMedal",
  fields: () => ({
    MedalId: { type: GraphQLString },
    Count: { type: GraphQLInt },
  }),
});

const ArenaFlexibleStatsType = new GraphQLObjectType({
  name: "ArenaFlexibleStats",
  fields: () => ({
    MedalStatCounts: { type: new GraphQLList(ArenaFlexibleMedalType) },
  }),
});

const ArenaFlexibleMedalType = new GraphQLObjectType({
  name: "ArenaFlexibleMedal",
  fields: () => ({
    Id: { type: GraphQLString },
    Count: { type: GraphQLInt },
  }),
});

module.exports = {
  ArenaGameBasesType,
  CsrStatsType,
  ArenaStatsType,
  AccumulativeArenaStatsType,
};
