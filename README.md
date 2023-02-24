# Stake Fish Full Stack / Backend Engineer Home Assessment.

## Coding Challenge

Please create a REST API based on the attached OpenAPI/Swagger definition in your preferred language (Node.JS, TypeScript, Go, Python, Ruby, Perl, Crystal, Nim, etc.). In addition to the endpoints included in the Swagger definition, please ensure that a Prometheus metrics endpoint is available in your application under `/metrics`. The application should also provide a `/health` endpoint.

The `/` (root) endpoint should provide the current date (UNIX epoch) and version. Additionally, a boolean property called Kubernetes should indicate if the application is running under Kubernetes. Below is an example of the expected output.

```json
{
   "version": "0.1.0",
   "date": 1663534325,
   "kubernetes": false
}
```

The `/v1/tools/lookup` endpoint should resolve ONLY the IPv4 addresses for the given domain. Make sure you log all successful queries and their result in a database of your choosing (PostgreSQL, MySQL/MariaDB, MongoDB, Redis, ElasticSearch, SurrealDB, etc.). No SQLite or file-based databases, as we're planning on deploying this service to Kubernetes.

For the `/v1/tools/validate` endpoint, the service should validate if the input is an IPv4 address or not.

The `/v1/history` endpoint should retrieve the latest 20 saved queries from the database and display them in order (the most recent should be first).

Please ensure the service starts on port 3000 and your REST API has an access log. Uh-oh, don't forget about graceful shutdowns.

If possible, please make sure the OpenAPI/Swagger is available so we can generate a client for your service (not mandatory).


## Environment Setup

I have provided a `docker-compose` file to help you setup project. The docker-compose file will spin up a Mongo and MongoExpress container.

Before starting, please ensure you have [docker-compose](https://docs.docker.com/compose/) and [Docker](https://www.docker.com/) installed on your system.

- Run application with `docker-compose up -d --build` or `yarn docker-compose:start`.

- Run application in development environment with `docker-compose up -build` or `yarn docker-compose:dev`.

- Run test with `yarn test` or `yarn docker-compose:test`.

- To check the status of the containers, run `docker-compose ps`.

- To check the logs of the containers, run `docker-compose logs -f`.

- You can browse the MongoExress interface at `http://localhost:8081`. You will need the `root` password to access. The password can be found in the `docker-compose.yml` file under `MONGO_INITDB_ROOT_PASSWORD`

- You can brows swagger document at `http://localhost:3000/api` and you will see 6 defined endpoints as follow the challange
<img width="1474" alt="Screenshot at Feb 24 07-36-48" src="https://user-images.githubusercontent.com/54128071/221192187-49fa7e6e-2e4b-4fd7-b0c2-336fa4d7c90f.png">


## Choosen Tech Stack
TypeScript, NestJS, MongoDB, Mongoose, Docker, Prometheus, Terminus

## Sample ENV

```PORT=3000
DATABASE_URI=mongodb://root:rootpwd@mongo:27017
APP_VERSION=0.1.0
APP_HISTORY_LIMIT=20
```

