const passengers = require('../db/passengers')
const flights = require('../db/flights')

// The root provides a resolver function for each API endpoint
const resolvers = {
  hello: data => `Hello world! ${data.name}`,

  passengers: () =>
    passengers.map(element => ({
      ...element,
      flights: flights.filter(
        el => element.flightIds.indexOf(el.id) != -1 && el,
      ),
    })),

  passenger: data => ({
    id: passengers[data.id].id,
    name: passengers[data.id].name,
    flights: flights.filter(
      el => passengers[data.id].flightIds.indexOf(el.id) != -1 && el,
    ),
  }),

  flights: () =>
    flights.map(element => ({
      ...element,
      passengers: passengers.filter(
        el => el.flightIds.indexOf(element.id) != -1 && el,
      ),
    })),

  flight: data => flights.filter(el => el.id === data.id && el),
}

module.exports = resolvers
