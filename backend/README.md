<p align="center">
  <img alt="GoBarber Logo" src="../frontend/src/assets/logo.svg">
</p>

<h3 align="center">
  GoBarber - Backend
</h3>

#### Tecnologias utilizadas
- HTML / JS / TypeScript
- [Celebrate](https://github.com/arb/celebrate)
- [Date-fns](https://date-fns.org/)
- [Eslint](https://eslint.org/)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/pt-BR/)
- [MongoDB](https://www.mongodb.com/pt-br)
- [NodeJS](https://pt-br.reactjs.org/)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [TypeORM](https://typeorm.io/#/)

## :rocket: Como executar o projeto
Pré-requisitos: npm / yarn + docker

##### Criando os containers que vão ser utilizados
```bash
# Postgres
docker run --name postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres

# Mongo
docker run --name mongo -p 27017:27017 -d -t mongo

# Redis
docker run --name redis -p 6379:6379 -d -t redis:alpine
```
##### Alterando os arquivos de configuração
1. Altere as credenciais do banco de dados no arquivo `ormconfig.example.json` e renomeie o arquivo para `ormconfig.json`
2. Altere as credenciais do arquivo `.env.example` e renomeie para `.env`

##### Executando o servidor
```bash
# Clone este repositório
git clone https://github.com/hiroyamaguch/gobarber.git

# Acesse a pasta do projeto no terminal/cmd
cd gobarber

# Instale as dependências
$ yarn
# ou
$ npm install

# Execute o projeto
$ yarn dev:server
# ou
$ npm run dev:server

# O servidor vai estar rodando no endereço http://localhost:3333
```
