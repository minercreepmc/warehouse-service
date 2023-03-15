# Warehouse Service

## Summarize

This app is built with Hexagonal Architecture, DDD, Event-sourcing, CQRS, a little bit Microservice that communicate to itself, the projector gonna act like it come from another service (the read side of CQRS)

This app build with super "details protection" (maybe), from failing in domain it gonna throw Error to return Result code in validation step in application service

## How to run application

Require: Docker

1. Clone packages
2. Go to the directory have just been cloned
3. Run `yarn up`
4. Go to [Swagger Docs](http://localhost:3000/docs) to use the API

## TODO:

- Build the front end for application
