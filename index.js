js
const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

const client = redis.createClient({
  url: 'redis://redis:6379'
});

client.on('error', (err) => console.log('Erro no Redis Client', err));

async function startServer() {
  await client.connect();
  console.log('Conectado ao Redis!');

  app.get('/', async (req, res) => {
    const visitas = await client.incr('contador_visitas');
    res.send(`Olá! Esta página foi visitada ${visitas} vezes.`);
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

startServer();

package.json

{
  "name": "meu-projeto-redis",
  "version": "1.0.0",
  "description": "Projeto Node.js com Redis usando Docker e Docker Compose",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "redis": "^4.6.7"
  }
}

Dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - redis
    environment:
      - REDIS_URL=redis://redis:6379

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

README.md

# Projeto Node.js com Redis e Docker

Este projeto demonstra a integração de uma aplicação Node.js com Redis usando Docker e Docker Compose.

## 🚀 Tecnologias
- Node.js
- Express
- Redis
- Docker
- Docker Compose

## ▶️ Como executar

1. Clone o repositório:
```bash
git clone <link-do-repositorio>
cd meu-projeto-redis

docker-compose up --build

http://localhost:3000



