## Description

Desafio Coopersystem

## Installation

```bash
# Instala as dependências
$ npm install
# Sobe container docker com imagem do posgresql
$ npm run start:dev:db
# Cria as tabelas
$ npm run typeorm:migration:run
# Create seed
$ npm run start:dev:seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
