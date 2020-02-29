const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const passengers = [
  {
    id: 0,
    name: 'Maarten',
    flightIds: [4],
  },
  {
    id: 1,
    name: 'Johan',
    flightIds: [1, 2, 3, 4],
  },
]

const flights = [
  {
    id: 1,
    departureIata: 'BRU',
    arrivalIata: 'CNF',
    flightDuration: 60,
  },
  {
    id: 2,
    departureIata: 'FRA',
    arrivalIata: 'MIL',
    flightDuration: 20,
  },
  {
    id: 3,
    departureIata: 'LUX',
    arrivalIata: 'LYN',
    flightDuration: 30,
  },
  {
    id: 4,
    departureIata: 'GRU',
    arrivalIata: 'CNF',
    flightDuration: 120,
  },
]

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

// The root provides a resolver function for each API endpoint
const root = {
  hello: data => `Hello world! ${data.name}`,

  passengers: () =>
    passengers.map(element => {
      return {
        ...element,
        flights: flights.filter(
          el => element.flightIds.indexOf(el.id) != -1 && el,
        ),
      }
    }),

  passenger: data => {
    const id = data.id

    return {
      id: passengers[id].id,
      name: passengers[id].name,
      flights: flights.filter(
        el => passengers[id].flightIds.indexOf(el.id) != -1 && el,
      ),
    }
  },

  flights: () => {
    return flights.map(element => {
      return {
        ...element,
        passengers: passengers.filter(
          el => el.flightIds.indexOf(element.id) != -1 && el,
        ),
      }
    })
  },

  flight: data => {
    return flights.filter(el => el.id === data.id && el)
  },
}

const app = express()

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
)

app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
