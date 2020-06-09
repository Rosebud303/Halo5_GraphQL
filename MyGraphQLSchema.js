const { api_key } = require('./client/src/apikey');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const {
  WeaponType,
  MapMetadataType,
  SeasonsMetadataType,
  FlexibleStatsMetadataType,
  ImpulsesMetadataType,
  GameBaseVariantType,
  MedalType,
  CampaignsType,
  SkullsType,
  VehiclesType,
  EnemiesType,
} = require('./MetadataTypes');
const { WarzoneStatType, ScenarioStatsType } = require('./WarzoneTypes');
const {
  ArenaGameBasesType,
  ArenaStatsType,
  AccumulativeArenaStatsType,
  CsrDataType,
} = require('./ArenaTypes');

//**************************************************** RE-USED INSTANCE VARIABLES */

const instance = axios.create({
  baseURL: 'https://www.haloapi.com/',
  headers: { 'Ocp-Apim-Subscription-Key': api_key },
});

const instanceWithAcceptedLanguage = axios.create({
  baseURL: 'https://www.haloapi.com/',
  headers: { 'Accept-Language': 'en', 'Ocp-Apim-Subscription-Key': api_key },
});

//**************************************************** ROOT QUERY */

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    mapsMetadata: {
      type: new GraphQLList(MapMetadataType),
      resolve() {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/maps`)
          .then((res) => res.data);
      },
    },
    seasonsMetadata: {
      type: new GraphQLList(SeasonsMetadataType),
      resolve() {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/seasons`)
          .then((res) => res.data);
      },
    },
    flexibleStatsMetadata: {
      type: new GraphQLList(FlexibleStatsMetadataType),
      resolve() {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/flexible-stats`)
          .then((res) => res.data);
      },
    },
    impulsesMetadata: {
      type: new GraphQLList(ImpulsesMetadataType),
      resolve() {
        return instanceWithAcceptedLanguage
          .get(`metadata/h5/metadata/impulses`)
          .then((res) => res.data);
      },
    },
    gameBaseVariantsMetadata: {
      type: new GraphQLList(GameBaseVariantType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/game-base-variants')
          .then((res) => res.data);
      },
    },
    weaponsMetadata: {
      type: new GraphQLList(WeaponType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/weapons')
          .then((res) => res.data);
      },
    },
    campaignsMetadata: {
      type: new GraphQLList(CampaignsType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/campaign-missions')
          .then((res) => res.data);
      },
    },
    skullsMetadata: {
      type: new GraphQLList(SkullsType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/skulls')
          .then((res) => res.data);
      },
    },
    enemiesMetadata: {
      type: new GraphQLList(EnemiesType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/enemies')
          .then((res) => res.data);
      },
    },
    vehiclesMetadata: {
      type: new GraphQLList(VehiclesType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/vehicles')
          .then((res) => res.data);
      },
    },
    medalsMetadata: {
      type: new GraphQLList(MedalType),
      resolve(parent, args) {
        return instanceWithAcceptedLanguage
          .get('metadata/h5/metadata/medals')
          .then((res) => res.data);
      },
    },
    arenaGameBases: {
      type: new GraphQLList(ArenaGameBasesType),
      args: {
        player_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/arena?players=${args.player_name}`)
          .then(
            (res) =>
              res.data.Results[0].Result.ArenaStats.ArenaGameBaseVariantStats
          );
      },
    },
    arenaCsr: {
      type: CsrDataType,
      args: {
        player_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/arena?players=${args.player_name}`)
          .then((res) => res.data.Results[0].Result.ArenaStats);
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
          .then(
            (res) =>
              res.data.Results[0].Result.ArenaStats.ArenaGameBaseVariantStats
          )
          .then((data) =>
            data.find(
              (specificVariant) =>
                specificVariant.GameBaseVariantId === args.GameBaseVariantId
            )
          );
      },
    },
    accumulativeArenaStats: {
      type: AccumulativeArenaStatsType,
      args: {
        player_name: { type: GraphQLString },
        GameBaseVariantId: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/arena?players=${args.player_name}`)
          .then((res) => res.data.Results[0].Result.ArenaStats);
      },
    },
    warzoneStats: {
      type: WarzoneStatType,
      args: {
        player_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/warzone?players=${args.player_name}`)
          .then((res) => res.data.Results[0].Result.WarzoneStat);
      },
    },
    scenarioStats: {
      type: new GraphQLList(ScenarioStatsType),
      args: {
        player_name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/warzone?players=${args.player_name}`)
          .then((res) => res.data.Results[0].Result.WarzoneStat.ScenarioStats);
      },
    },
    wzVariantStats: {
      type: new GraphQLList(ScenarioStatsType),
      args: {
        player_name: { type: GraphQLString },
        GameBaseVariantId: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/warzone?players=${args.player_name}`)
          .then((res) => res.data.Results[0].Result.WarzoneStat.ScenarioStats)
          .then((data) =>
            data.filter(
              (item) => item.GameBaseVariantId == args.GameBaseVariantId
            )
          );
      },
    },
    mapStats: {
      type: ScenarioStatsType,
      args: {
        player_name: { type: GraphQLString },
        GameBaseVariantId: { type: GraphQLString },
        MapId: { type: GraphQLString },
      },
      resolve(parent, args) {
        return instance
          .get(`stats/h5/servicerecords/warzone?players=${args.player_name}`)
          .then((res) => res.data.Results[0].Result.WarzoneStat.ScenarioStats)
          .then((data) =>
            data.find(
              (item) =>
                item.GameBaseVariantId == args.GameBaseVariantId &&
                item.MapId == args.MapId
            )
          );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
