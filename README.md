<div align="center">
  <h1>Web chat</h1>
</div>

## Installing

```bash
  git clone git@github.com:Glx777/web_chat.git
  cd web_chat
  yarn
```

## Develop

- Run `docker-compose up -d` to start PostgreSQL service
  - the PostgreSQL service available on <http://localhost:8081>

### Develop API service

- Run `yarn api` to start API server

### Develop Web App service

- Run `yarn client` to start WEB server.
- Open `http://localhost:3000/` in browser.

## Dockerize

- Run `docker-compose -f deploy/docker-compose.yml build` to build images
- Run `docker-compose -f deploy/docker-compose.yml up -d` to start containers
- Run `docker-compose -f deploy/docker-compose.yml down` to stop containers
