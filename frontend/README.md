# Personal Finance

Aplicacao full stack para gerenciamento de financas pessoais.

O sistema permite:
- Cadastro de pessoas (criar, editar, excluir e listar)
- Cadastro de categorias (criar e listar)
- Cadastro de transacoes (criar e listar)
- Validacoes de regra de negocio:
	- Menor de idade (idade < 18) pode registrar apenas despesa
	- Categoria deve ser compativel com o tipo da transacao
- Relatorios:
	- Totais por pessoa (receitas, despesas e saldo)
	- Totais por categoria (opcional)

## Tecnologias

- Frontend: React + TypeScript + Tailwind
- Backend: ASP.NET Core 8 + Entity Framework Core
- Banco de dados: PostgreSQL
- Autenticacao: ASP.NET Identity + JWT

## Pre-requisitos

Instale os itens abaixo:
- Node.js 18+
- npm 9+
- .NET SDK 8
- PostgreSQL 14+

## Configuracao

### 1. Banco de dados

No backend, a conexao padrao esta em [api/appsettings.json](../api/appsettings.json):

`Host=localhost;Port=5432;Database=personal-finance;Username=postgres;Password=postgres`

Crie o banco e ajuste usuario/senha conforme seu ambiente, se necessario.

### 2. Backend (API)

No terminal, execute:

```bash
cd ../api
dotnet restore
dotnet run
```

API padrao em desenvolvimento:
- `http://localhost:5167`
- Swagger: `http://localhost:5167/swagger`

### 3. Frontend

Em outro terminal:

```bash
cd .
npm install
npm start
```

Frontend em desenvolvimento:
- `http://localhost:3000`

## Como usar

1. Acesse o frontend em `http://localhost:3000`
2. Crie uma conta ou faca login
3. Abra o modulo de financas em `/finance`
4. Cadastre pessoas, categorias e transacoes
5. Consulte os totais por pessoa/categoria na mesma tela

## Build de producao

```bash
npm run build
```

## Observacoes

- O backend usa `EnsureCreated()` para criar estrutura inicial em ambiente de desenvolvimento.
- Caso a API nao suba, valide se o PostgreSQL esta ativo e se a connection string esta correta.
