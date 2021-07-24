<h1 align="center">
  GoBarber - Backend
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/hiroyamaguch/gobarber?color=04D361">

  <a href="https://pedroyamaguchi.dev/">
    <img alt="Made by Pedro Yamaguchi" src="https://img.shields.io/badge/made%20by-Pedro%20Yamaguchi-04D361">
  </a>

  <a href="./LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-04D361">
  </a>
</p>

<p align="center">
  <a href="#memo-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-executar-o-projeto">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://www.figma.com/file/pKv4HdDnafeXNm1h4LYb07/Web?node-id=0%3A1">Projeto no Figma</a>
</p>

## :memo: Sobre o projeto
GoBarber é uma aplicação para realizar agendamentos de serviço de cabeleireiro. Essa aplicação foi desenvolvida durante o curso Bootcamp GoStack da Rocketseat.

#### Tecnologias utilizadas
- HTML / JS / TypeScript
- [NodeJS](https://pt-br.reactjs.org/)

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

# O servidor vai estar rodando no endereço [http://localhost:3333](http://localhost:3333)
```
