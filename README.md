# app-setup — API Node.js + MongoDB

API REST simples para cadastro e autenticação de usuários e administradores, feita com **Express** e **MongoDB (Mongoose)**. As senhas são armazenadas com hash **bcrypt**. O projeto está preparado para deploy no **Heroku** (`Procfile`).

## Tecnologias

| Pacote   | Versão | Uso                                   |
| -------- | ------ | ------------------------------------- |
| Node.js  | ≥ 20.19 | Runtime (exigido pelo Mongoose 9)    |
| express  | 5.x    | Servidor HTTP e rotas                 |
| mongoose | 9.x    | ODM para o MongoDB                    |
| bcrypt   | 6.x    | Hash e verificação de senhas          |
| cors     | 2.x    | Liberação de CORS                     |
| dotenv   | 18.x   | Leitura das variáveis do arquivo `.env` |

## Estrutura

```
app-setup/
├── server.js                  # Inicialização do Express e conexão com o MongoDB
├── Procfile                   # Comando de start no Heroku
├── .env.example               # Modelo das variáveis de ambiente
└── src/
    ├── router/routers.js      # Definição das rotas
    ├── controlers/
    │   ├── userController.js       # Regras dos usuários
    │   └── userAdminController.js  # Regras dos administradores
    └── models/
        ├── user.js            # Coleção "users"
        └── userAdmin.js       # Coleção "useradmins"
```

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo de exemplo e preencha a string de conexão:

   ```bash
   cp .env.example .env
   ```

   | Variável       | Obrigatória | Descrição                                        |
   | -------------- | ----------- | ------------------------------------------------ |
   | `STRING_MONGO` | Sim         | URI do MongoDB (local ou Atlas)                  |
   | `PORT`         | Não         | Porta HTTP. Padrão: `4000`                       |

3. Inicie o servidor:

   ```bash
   npm start      # produção
   npm run dev    # desenvolvimento (reinicia ao salvar, via node --watch)
   ```

Quando tudo estiver certo, o console mostra `Servidor conectado 4000` e `Aplicação connectada ao banco de dados.`

## Modelos

**users**

| Campo      | Tipo   | Observação                         |
| ---------- | ------ | ---------------------------------- |
| `name`     | String | Opcional                           |
| `email`    | String | Obrigatório, único, salvo em minúsculas |
| `password` | String | Obrigatório (hash bcrypt)          |
| `timeuse`  | Number | Padrão `0`                         |

**useradmins**

| Campo      | Tipo   | Observação                |
| ---------- | ------ | ------------------------- |
| `username` | String | Único                     |
| `password` | String | Obrigatório (hash bcrypt) |
| `created`  | Date   | Padrão: data de criação   |

## Rotas

Todas as rotas usam o método **POST** e recebem o corpo em JSON (`Content-Type: application/json`). As respostas são texto simples, exceto `/getUsers`, que devolve JSON.

### Usuários

| Rota             | Corpo                              | Respostas                                                                 |
| ---------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| `/createUser`    | `{ name, email, password }`        | `201 Create` · `201 Existe` (e-mail já cadastrado) · `200 Erro` (dados faltando) |
| `/signin`        | `{ email, password }`              | `201 <nome do usuário>` · `201 notExist` · `201 Erro na autenticação de usuário, confira seus dados.` |
| `/alterPassword` | `{ email, password }`              | `201 2`                                                                   |
| `/updateTime`    | `{ email, timeuse }`               | `201 ok`                                                                  |
| `/delete`        | `{ email }`                        | `200 ok`                                                                  |
| `/getUsers`      | —                                  | `200 [ ...usuários ]` (sem o campo `password`)                            |

### Administradores

| Rota                   | Corpo                    | Respostas                       |
| ---------------------- | ------------------------ | ------------------------------- |
| `/createAdmin`         | `{ username, password }` | `201 Create` · `200 Erro`       |
| `/adminSignin`         | `{ username, password }` | `200 Ok.` · `200 erro`          |
| `/changePasswordAdmin` | `{ username, password }` | `200 Ok` · `200 Erro`           |

Erros inesperados (por exemplo, banco fora do ar ou `username` de admin duplicado) retornam `500 Erro` e são registrados no console.

### Exemplo

```bash
curl -X POST http://localhost:4000/createUser \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@exemplo.com","password":"123456"}'
# Create

curl -X POST http://localhost:4000/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"ana@exemplo.com","password":"123456"}'
# Ana
```

## Deploy no Heroku

O `Procfile` executa `npm start`. Configure a variável `STRING_MONGO` em **Settings → Config Vars**. O Heroku define a `PORT` automaticamente.

## Segurança

- Nunca versione o arquivo `.env`; ele já está no `.gitignore`.
- As rotas não têm autenticação por token: qualquer cliente pode listar ou excluir usuários e criar administradores. Para uso em produção, proteja essas rotas (por exemplo, com JWT).

## Licença

ISC — Marcos Valério
