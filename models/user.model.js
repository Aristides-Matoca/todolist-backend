const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dbMongo = require('../config/dbMongo')
const { Schema } = mongoose;

// Definição do esquema do usuário
const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email can't be empty"], // Email é obrigatório
        // Verifica se o formato do email está correto usando uma expressão regular
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email format is not correct",],
        unique: true, // Garante que cada email seja único
    },
    
    password: {
        type: String,
        required: [true, "Password is required"], // A senha é obrigatória
    },
}, { timestamps: true }); // Adiciona timestamps para createdAt e updatedAt

// Função executada antes de salvar um usuário no banco de dados
userSchema.pre('save', async function () {
    var user = this;
    if (!user.isModified("password")) { // Se a senha não foi modificada, não precisa fazer nada
        return
    }

    try {
        // Gera um salt e usa para criar um hash da senha
        const salt = await (bcrypt.genSalt(10))
        const hashpass = await bcrypt.hash(user.password, salt)

        user.password = hashpass // Substitui a senha do usuário pela senha hasheada
    } catch (error) {
        throw error // Lança qualquer erro que ocorrer durante o processo
    }
})

// Método para comparar a senha fornecida com a senha armazenada no banco de dados
userSchema.methods.comparePassword = async function (userPassword) {
    try {
        console.log('------------------------no password', this.password)
        const isMatch = await bcrypt.compare(userPassword, this.password) // Compara as senhas usando bcrypt
        return isMatch // Retorna true se as senhas coincidirem, caso contrário retorna false
    } catch (error) {
        throw error // Lança qualquer erro que ocorrer durante o processo
    }
}

// Cria o modelo de usuário com o esquema definido
const UserModel = dbMongo.model('user', userSchema)

// Exporta o modelo de usuário
module.exports = UserModel
