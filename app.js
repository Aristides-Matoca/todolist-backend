const express = require('express')
const body_parser = require('body-parser')
const UserRouter = require('./routers/user.router')
const ToDoRouter = require('./routers/todo.router')

const app = express()
// Middleware para analisar solicitações JSON
app.use(body_parser.json())

// Rotas para usuários e tarefas
app.use('/', UserRouter) // Define as rotas para as operações relacionadas aos usuários
app.use('/', ToDoRouter) // Define as rotas para as operações relacionadas às tarefas

module.exports = app // Exporta o aplicativo Express para uso em outros arquivos
