const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = require('graphql')
const axios = require('axios')

const SpartanType = new GraphQLObjectType({
  name: 'Spartan',
  fields: () => ({
    summary: {type: GraphQLString}
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
        return axios.get(`https://www.haloapi.com/profile/h5/profiles/${args.player_name}/appearance`)
          .then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})