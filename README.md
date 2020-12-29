# Medadmin API
Node.js-based GraphQL-API for Medadmin CRM.

## Initial project setup

1. Clone the repository and go to the project directory.
2. Create a SQLite database file.
3. Copy `.env.example` file into `.env` and fill it.

## Available Scripts
In the project directory, you can run:

### `npm fresh`

Rollbacks and reruns all migrations, then runs all seeders.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to view it in the browser.

## Run database with Docker
```
docker run \
    --name db.medadmin --rm \
    -dp 5432:5432 \
    -v $(pwd)/db/data:/var/lib/postgresql/data \
    -e POSTGRES_PASSWORD=secret \
    postgres:alpine
```

