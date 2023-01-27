# Warehouse Service

![Warehouse Service CheatSheat](./assets/diagrams/bounded-context.png)

## How to run application

Require: Docker

1. Clone packages
2. Go to the directory have just been cloned
3. Run `yarn up`
4. Go to [Swagger Docs](http://localhost:3000/docs) to use the API

## TODO:

- Optimize event-store (Remove mapping between domain and database model => Seperate read and write model)
- Build the front end for application
