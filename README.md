<div align="center">
     <img width="30%" src="https://github.com/cesarhenrq/metavagas-frontend/assets/92116544/2698b07c-186c-4db7-abc6-1bb60d4c638f"/>
</div>

# 📃 Sobre a API

Este repositório contém a API desenvolvida para o projeto MetaVagas. A API MetaVagas é um sistema que gerencia vagas de emprego, permitindo que os usuários se cadastrem e encontrem vagas de emprego compatíveis com seus perfis. Ela fornece serviços essenciais para o aplicativo web MetaVagas, como o armazenamento e gerenciamento de informações de vagas, perfis de usuários e autenticação segura.

Aqui, você encontrará informações sobre como configurar e executar a API MetaVagas em sua própria máquina, bem como detalhes sobre as tecnologias utilizadas.

**Acesse a API MetaVagas para fazer requisições [aqui](https://metavagasapi.onrender.com/).**

# 💻 Tecnologias utilizadas

![Node.js](https://img.shields.io/badge/Node.js-0D1117?style=for-the-badge&logo=node.js&labelColor=0D1117)
![TypeScript](https://img.shields.io/badge/TypeScript-0D1117?style=for-the-badge&logo=typescript&labelColor=0D1117)
![TypeORM](https://img.shields.io/badge/TypeORM-0D1117?style=for-the-badge&logo=typeorm&labelColor=0D1117)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-0D1117?style=for-the-badge&logo=postgresql&labelColor=0D1117)
![Jest](https://img.shields.io/badge/Jest-0D1117?style=for-the-badge&logo=jest&labelColor=0D1117)
![DotEnv](https://img.shields.io/badge/DotEnv-0D1117?style=for-the-badge&logo=dotenv&labelColor=0D1117)
![BCrypt](https://img.shields.io/badge/BCrypt-0D1117?style=for-the-badge&logo=lock&labelColor=0D1117)
![XLSX](https://img.shields.io/badge/XLSX-0D1117?style=for-the-badge&logo=table&labelColor=0D1117)
![ESLint](https://img.shields.io/badge/ESLint-0D1117?style=for-the-badge&logo=eslint&labelColor=0D1117)
![Prettier](https://img.shields.io/badge/Prettier-0D1117?style=for-the-badge&logo=prettier&labelColor=0D1117)

![node version](https://img.shields.io/npm/v/@nestjs/core.svg)
![typescript version](https://img.shields.io/badge/typescript-4.5.4-brightgreen)
![typeorm version](https://img.shields.io/badge/typeorm-0.3.17-brightgreen)
![jest version](https://img.shields.io/badge/jest-29.5.0-brightgreen)
![dotenv version](https://img.shields.io/badge/dotenv-16.3.1-brightgreen)
![bcrypt version](https://img.shields.io/badge/bcrypt-5.1.1-brightgreen)
![xlsx version](https://img.shields.io/badge/xlsx-0.18.5-brightgreen)
![eslint version](https://img.shields.io/badge/eslint-8.50.0-brightgreen)
![prettier version](https://img.shields.io/badge/prettier-2.8.8-brightgreen)

#

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)

# 🚀 Começando

Estas instruções permitirão que você obtenha uma cópia funcional do projeto em
sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

- [Node.js](https://nodejs.org/en) - Ambiente de execução JavaScript

### 🔧 instalação

1. Clone o repositório:

```bash
$ git clone https://github.com/Daniel-Brd/metavagas-backend
```

2. Instale as dependências:

```bash
$ yarn
```

ou

```bash
$ npm install
```

3. Execute o aplicativo:

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

ou

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# 🧪 Executando os testes:

## 🔬 Testes unitários:

Para executar os testes de unidade, execute o seguinte comando:

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
ou

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# 🔍 Linting:

Para executar o linting, execute o seguinte comando:

```bash
$ yarn lint
```

ou

```bash
$ npm run lint
```

# 📏 Formatação:

Para executar a formatação, execute o seguinte comando:

```bash
$ yarn format
```

ou

```bash
$ npm run format
```

# 🔌 Deployment:

Para implantar o aplicativo, execute o seguinte comando:

```bash
$ yarn build
```

ou

```bash
$ npm build
```

Este comando irá gerar uma pasta `dist` contendo o código compilado.

# 🏢 Arquitetura:

## 📁 Estrutura das pastas:

```bash
├── src
│   ├── auth
│   │   ├── dto
│   │   │   ├── dto.ts
│   │   ├── guards
│   │   │   ├── guard.ts
│   │   ├── jwt
│   │   │   └──jtw.config.ts
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.spec.ts
│   │   └── auth.service.ts
│   ├── database
│   │   ├── entities
│   │   │   ├── entity.ts
│   │   ├── database.config.ts
│   │   └── database.module.ts
│   ├── decorators
│   │   ├── custom.decorator.ts
│   ├── docs
│   │   ├── schemas
│   │   │   ├── api.schema.ts
│   ├── entities
│   │   ├── entity
│   │   │   ├── dto
│   │   │   │   ├── dto.ts
│   │   │   ├── entity.controller.spec.ts
│   │   │   ├── entity.controller.ts
│   │   │   ├── entity.module.ts
│   │   │   ├── entity.service.spec.ts
│   │   │   └── entity.service.ts
│   ├── enums
│   │   ├── enum.ts
│   ├── testing
│   │   ├── mocks
│   │   │   ├── mock
│   │   │   │   ├── mock.ts
│   ├── utils
│   │   ├── functions
│   │   │   ├── function.ts
│   │   └── constants.ts
│   ├── app.module.ts
│   ├── main.ts
```

## 📄 Descrição:

- `auth`: Pasta que contém os metodos de autenticação de usuario.
- `database`: Pasta que contém as configurações do banco de dados, e suas entidades.
- `decorators`: Pasta que contém custom decorators feitos para nest.JS.
- `docs`: Pasta que contém a os schemas para documentação do projeto com swagger.
- `entities`: Pasta que contém os endpoints, serviços e modulos das entidades do projeto.
- `enums`: Pasta que contém os enums utilizados no projeto.
- `testing`: Pasta que contém os mocks para implementação de testes com jest.
- `utils`: Pasta que contém as utilidades comuns do projeto.
- `app.module.ts`: Arquivo responsável por importar e configurar todos os módulos necessários para o funcionamento do aplicativo.
- `main.ts`: Arquivo que contém o bootstrap e configurações principais do projeto.

# ✒️ Autores:

<table>
  <tr>
    <td align="center"><a href="https://github.com/Daniel-Brd"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/118939962?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Brandão</b></sub></a><br /><a href="https://github.com/Daniel-Brd" title="Metavagas"></a></td>
    <td align="center"><a href="https://github.com/Osouzaa"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/101714272?v=4" width="100px;" alt=""/><br /><sub><b>Gabriel Souza</b></sub></a><br /><a href="https://github.com/Osouzaa" title="Metavagas"></a></td>
    <td align="center"><a href="https://github.com/piciliano"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/119634719?v=4" width="100px;" alt=""/><br /><sub><b>Piciliano</b></sub></a><br /><a href="https://github.com/piciliano" title="Metavagas"></a></td>
  </tr>
</table>
```
