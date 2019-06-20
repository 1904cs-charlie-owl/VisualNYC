const {gql} = require('apollo-server-express')

module.exports = gql`
  type User {
    id: ID!
    email: String!
    password: String
    salt: String
    googleId: String
    users: [User!]!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`
