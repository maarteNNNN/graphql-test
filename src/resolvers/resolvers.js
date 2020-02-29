const passengers = require('../db/passengers')
const flights = require('../db/flights')

// The root provides a resolver function for each API endpoint
const resolvers = {
  hello: data => `Hello world! ${data.name}`,

  passengers: () =>
    passengers.map(element => {
      console.log(element)
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

module.exports = resolvers
