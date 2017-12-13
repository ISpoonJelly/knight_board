# Board Knight Problem

### A simple NodeJS API server that solves the knight's shortest path problem where a shortest path between the knight's current position and a target position is to be found.

## Tech Stack
  - Express
  - MongoDB
  - Chai
  - Mocha
  - SuperTest

## Endpoints

| Route | Description | Parmeters | Exmaple |
|:-----------:|:------------:|:-----------:|:------------:|
| /board/set_board | Saves a board configuration and returns its id | knight | { knight: "H1" }
| /board/get_shortest_path | Get the shortest route from a previously saved knight to a specific target position | id, target | { id: "ABC123", target: "G2" }


## Testing
To run all tests simply execute the command

```
npm test
```

To only run unit tests execute

```
npm run test:unit
```

and for integration tests execute

```
npm run test:integ
```

>Note: Integration tests assume a running instance of mongo db

## Running
Starting the server can be achieved by either running
```
npm start
```
> which assumes a MongoDB server is running on the default port(27017) and the server is conigured to the correct host address.

or by starting a docker container for the stack using the command
```
docker-compose up
```
Which will start a container for a standalone MongoDB server and another container to the Nodejs app.

## configuration
The server config file can be used to configure the port that the server will listen to and the MongoDB uri that it will connect to. It takes its input as environment variables:
 - PORT: specifies the port that the server will listen on.
 - MONGO_HOST: specifies the host address of the MongoDB server.
 an example of running the app with custom configuration would look like:
 ```
 PORT=##### MONGO_HOST=#.#.#.# npm start
 ```

>When running throught the ```docker-compose up``` command you should change the environment variables for the containers throught the [docker-compose](./docker-compose.yml) file in the environment list:
```
environment:
  - PORT=3000
  - MONGO_HOST=mongo
```
