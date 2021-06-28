# Medadmin API

Node.js-based GraphQL-API for [Medadmin CRM](https://github.com/paulcervov/medadmin-graphql-crm).

## Setup project:
1. Run `npm i` command
1. Run `cp .env.example .env`
1. Setup database connection
1. Change the `*.env` files as you want

Optional: with Docker you can start the database in a container
with just one command: `docker-compose up -d`.

## Run local:
Run `npm run dev` command, then go to `http://localhost:4000`  
and work in a graphql playground.

Optional: you can run `./bin/db/fresh.db` command  
to rollback and re-run all migrations and seeders.

## Build for production

Run `docker build -t paulcervov/medadmin-api .` for build docker image. 


## Run in production

Run `docker-compose up -d` for running app and database in containers.  
Also, you can run `docker-compose logs -f` to view container logs.  
To stop all containers run `docker-compose down`.
