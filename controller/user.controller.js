const UserServices = require('../services/user.services');

// Controlador para registrar um novo usuário
exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password } = req.body;

        // Verifica se já existe um usuário com o mesmo email
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`User with email ${email} already exists`);
        }

        // Registra o novo usuário
        await UserServices.registerUser(email, password);

        // Responde com sucesso
        res.json({ status: true, success: 'User registered successfully' });
    } catch (error) {
        console.log("---> error -->", error);
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
}

// Controlador para fazer login de um usuário
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Verifica se o email e a senha foram fornecidos
        if (!email || !password) {
            throw new Error('Parameters are not correct');
        }

        // Busca o usuário no banco de dados
        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }

        // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new Error(`Username or password does not match`);
        }

        // Cria um token de acesso para o usuário
        const tokenData = { _id: user._id, email: user.email };
        const token = await UserServices.generateAccessToken(tokenData, "secret", "1h")

        // Responde com sucesso e envia o token
        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
}
