const mongoose = require('mongoose')

// Cria uma conexão com o banco de dados MongoDB
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/healthAppDB').on('open', () => {
    console.log('MongoDB connected') // Loga quando a conexão com o MongoDB é estabelecida com sucesso
}).on('error', () => {
    console.log('MongoDB connection error') // Loga quando ocorre um erro ao estabelecer a conexão com o MongoDB
})
    
module.exports = connection // Exporta a conexão para ser usada em outros arquivos
