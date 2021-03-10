# Desafio Nestjs

<p float="center">
  <img alt="nestjs.js" src="https://img.shields.io/badge/nestjs%20-%2320232a.svg?&style=for-the-badge&logo=nestjs&logoColor=%FF4287f5"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white"/>
</p>

## Instalação

```bash
# Instala as dependências
$ npm install
# Sobe container docker com imagem do posgresql
$ npm run start:dev:db
# Cria as tabelas
$ npm run typeorm:migration:run
# Cria a seed com usuário master
$ npm run start:dev:seed
```

## Rodando o aplicativo

```bash
# Desenvolvimento
$ npm run start

# Nodemon
$ npm run start:dev

# Produção
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
