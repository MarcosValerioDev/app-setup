const UserAdmin = require('../models/userAdmin');
const bcrypt = require('bcrypt')

const UserAdminController ={
    createUserAdmin : async (req, res)=>{
        const { username, password } = req.body;
        if (!password) return res.status(200).send("Erro");
        const ps = await bcrypt.hash(password, 10);
        await UserAdmin.create({ username, "password": ps });
        return res.status(201).send("Create");
    },
    signinAdimin : async (req, res)=>{
        const { username, password } = req.body;

        const userCheck = await UserAdmin.findOne({username}).exec();
        if (!userCheck) return res.status(200).send("erro");
        const pass = await bcrypt.compare(password || '', userCheck.password);
        if (pass) return res.status(200).send("Ok.");
        return res.status(200).send("erro");
    },
    changePassword : async (req, res)=>{
        const { username, password } = req.body;
        if (!password) return res.status(200).send("Erro");
        const encrypted = await bcrypt.hash(password, 10);
        await UserAdmin.updateOne({username}, {"password":encrypted}).exec();
        return res.status(200).send("Ok");
    }
}

module.exports = UserAdminController;
