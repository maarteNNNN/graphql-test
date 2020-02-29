const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const resolvers = require('./resolvers/resolvers')

const app = express()

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  }),
)

app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
