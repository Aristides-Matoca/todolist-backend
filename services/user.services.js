const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

// Classe responsável por fornecer serviços relacionados ao usuário
class UserService {
    // Método para registrar um novo usuário no sistema
    static async registerUser(email, password) {
        try {
            // Cria um novo usuário com o email e a senha fornecidos
            const createUser = new UserModel({ email, password })
            // Salva o novo usuário no banco de dados
            return await createUser.save()
        } catch (error) {
            throw error // Lança qualquer erro que ocorrer durante o processo
        }
    }

    // Método para obter os dados de um usuário pelo email
    static async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email }); // Procura um usuário pelo email fornecido
        } catch (err) {
            console.log(err); // Registra qualquer erro que ocorrer durante o processo
        }
    }

    // Método para verificar se um usuário existe com base no email
    static async checkUser(email) {
        try {
            return await UserModel.findOne({ email }); // Verifica se existe um usuário com o email fornecido
        } catch (error) {
            throw error; // Lança qualquer erro que ocorrer durante o processo
        }
    }

    // Método para gerar um token de acesso para o usuário
    static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
        // Gera um token JWT usando os dados fornecidos e a chave secreta, definindo um tempo de expiração
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}

module.exports = UserService // Exporta a classe UserService para uso em outros arquivos
