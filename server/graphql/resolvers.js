const {gql} = require('apollo-server-express')
const db = require('../db/models')

module.exports = {
  User: {
    users: parent => parent.getUsers()
  },
  Query: {
    users: () => db.User.findAll(),
    user: (parent, {id}) => db.User.findByPk(id)
  }
}
