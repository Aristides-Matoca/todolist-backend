const app = require('./app') // Importa o aplicativo Express
const dbMongo = require('./config/dbMongo') // Importa a configuração do MongoDB
const UserModel = require('./models/user.model') // Importa o modelo de usuário
const port = 3000 // Porta em que o servidor irá ouvir as solicitações

// Rota inicial para testar o servidor
app.get('/', (req, res) => {
    res.send('Hello Aristides!!!!!!') // Responde com uma mensagem de boas-vindas
})

// Inicia o servidor e o faz escutar na porta especificada
app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`) // Loga a mensagem indicando que o servidor está ouvindo
})
