# graphql-test

Just toying around with GraphQL

## Install

`npm i` or `yarn install`
run: `npm start` or `yarn start`
Server serving on `http://localhost:4000/graphql`

## Sample query

```graphql
{
  hello(name: "Maarten")
  flights {
    id
    departureIata
    arrivalIata
    flightDuration
    passengers {
      id
      name
    }
  }
}
```

and

```graphql
{
  passengers {
    id
    name
    flights {
      id
      departureIata
      arrivalIata
      flightDuration
    }
  }
}
```
