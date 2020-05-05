const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = require('graphql')
const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://www.haloapi.com/',
  headers: { 'Ocp-Apim-Subscription-Key': '' },
})



const SpartanType = new GraphQLObjectType({
  name: 'Spartan',
  fields: () => ({
    Gamertag: {type: GraphQLString},
    ServiceTag: {type: GraphQLString}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    spartan: {
      type: SpartanType,
      args: {
        player_name: { type: GraphQLString } 
      },
      resolve(parent, args) {
        return instance
        .get(`profile/h5/profiles/${args.player_name}/appearance`)
          .then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})