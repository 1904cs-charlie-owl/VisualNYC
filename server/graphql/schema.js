const {ApolloServer, gql} = require('apollo-server-express')
const typeDefs = require('./types')
const resolvers = require('./resolvers')
const db = require('../db/index')

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: {db},
  playground: {
    endpoint: `http://localhost:3000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
})

// Exports
module.exports = SERVER
