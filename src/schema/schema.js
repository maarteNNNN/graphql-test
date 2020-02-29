const { buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello(name: String!): String!
    passengers: [Passenger!]!
    passenger(id: Int!): Passenger!
    flights: [Flight!]!
    flight(id: Int!): Flight!
  }

  type Passenger {
    id: Int!
    name: String!
    flights: [Flight!]!
  }

  type Flight {
    id: Int!
    departureIata: String!
    arrivalIata: String!
    flightDuration: Int!
    passengers: [Passenger]
  }
`)

module.exports = schema
