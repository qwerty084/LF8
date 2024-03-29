# Chirp

## Setup

-   Clone the repository

```bash
git clone https://github.com/qwerty084/LF8.git
```

### API

-   Build docker containers

```bash
docker compose build --no-cache
```

-   Start docker containers

```bash
docker compose up --wait
```

#### Using prebuilt images for the API

```bash
docker-compose -f compose.prebuild.yaml up -d
```

### Frontend

-   Start Frontend Docker container

```bash
docker compose -f chirp-frontend/docker-compose.yml up -d
```

## Building Docker images

```bash
cd api
```

-   dev

```bash
docker build -t ghcr.io/qwerty084/api_dev:latest --target frankenphp_dev .
```

-   prod

```bash
docker build -t ghcr.io/qwerty084/api_prod:latest --target frankenphp_prod .
```

## Routes

-   Next.js Frontend: http://localhost:3000
-   API: https://localhost/api
-   API Documentation: https://localhost/api/docs

## Database (ERD)

![Database](./assets/erd.webp)

## Deployment-Diagram

![Deployment diagram](./assets/deployment-diagram.webp)
