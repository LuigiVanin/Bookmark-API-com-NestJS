<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">BookMark API</h1>

## Descrição 🖇️

Essa é uma api desenvolvida usando NestJs e TypeScript, e consiste uma aplicação que salva links como bookmarks em um banco postgres. Como esse app é apenas para aprendizado utilizei um banco postgres dentro de um container Docker!

## Bibliografia

Esse projeto foi baseado em um [curso do free bootcamp](https://www.youtube.com/watch?v=GHTA143_b-s&t=9637s)

## Instalação ⬇️

```bash
$ npm install
```

## Rodando o App 🚀

Para rodar o app é muito importante configurar o banco de dados no arquivo "./prisma/schema.prisma" e .env

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes 🧪

Os unicos testes desenvolvidos nessa aplicação são os de integração ou e2e. Para rodar os testes é necessário que o usuário tenha **docker** instalado em seu computador.

```bash
# e2e tests
$ npm run test:e2e
```

## Ferramentas Utilizadas 🛠️

<p align="center">
    <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white" />
    <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white">
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
</p>

## Outras Ferramentas 📦

-   [pactum](https://pactumjs.github.io/).
-   [passport](https://www.passportjs.org/)

_-> Mais pacotes podem ser vistos nos package.json de cada repo._

## Entre em contato 📞

<br>

<p align="center">
<a href="https://www.linkedin.com/in/luis-felipe-vanin-martins-5a5b38215">
<img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue">
</a>
<a href="mailto:luisfvanin2@gmail.com">
<img src="https://img.shields.io/badge/Gmail:%20luisfvanin2@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white">
</a>
</p>
