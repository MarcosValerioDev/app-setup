const RecoverPassword = require('../models/recoverPassword');
const  { sendMail }  = require('../mail/mail');
const uuid = require('uuid')

const RecoverPasswordController ={
    rpassowrd : async (req, res)=>{
        const { email, name } = req.body;
        const hash = uuid.v1();
        const userCheck = await RecoverPassword.create({ email, hash });
        if (userCheck) return res.status(200).send(userCheck);
        if (userCheck) {
             await sendMail(email, name, hash)
             return res.status(201).send("Verifique seu email, para finalizar o processo de recuperação de senha.");
         }
         else return res.status(200).send("Esta conta não existe.");  
    },
    checkHash:async (req,res)=>{
        const { email, hash } = req.body;
        const userCheck = await RecoverPassword.findOne({ email, hash }).exec();
        if (!userCheck) return res.status(200).send("Espirou");
        if (!userCheck.state) return res.status(200).send("ok");  
        else return res.status(200).send("Espirou");  
    }
}

module.exports = RecoverPasswordController;