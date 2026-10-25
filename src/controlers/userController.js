const Users = require('../models/user');
const bcrypt = require('bcrypt');
const UserController ={
    createuser : async (req, res)=>{
        const { name, password, email } = req.body;
        if (!email || !password) return res.status(200).send("Erro");
        const userCheck = await Users.findOne({ email: email.toLowerCase() }).exec();

        if (userCheck) return res.status(201).send("Existe");
        const ps = await bcrypt.hash(password, 10);
        await Users.create({name, password:ps, email});
        return res.status(201).send("Create");
    },
    alterPassword : async (req, res)=>{
        const { email, password } = req.body;
        if (!password) return res.status(200).send("Erro");
        const ps = await bcrypt.hash(password, 10);
        await Users.updateOne({email}, {"password" : ps}).exec();

        return res.status(201).send("2");
    },
    updateTime : async (req, res)=>{
        const { timeuse, email } = req.body;
            await Users.updateOne({email}, {timeuse}).exec();
            return res.status(201).send("ok");
    },
    signin : async (req, res) =>{
        const { email, password } = req.body;
        const user = await Users.findOne({ email }).lean().exec();
        if (!user) return res.status(201).send("notExist");
        const check = await bcrypt.compare(password || '', user.password);
        if (!check) return res.status(201).send("Erro na autenticação de usuário, confira seus dados.");
        return res.status(201).send(user.name);
    },
    deleteUser: async (req, res)=>{
        const { email } = req.body;
        await Users.deleteOne({ email }).exec();
        return res.status(200).send("ok");
    },
    getUsers: async (req, res)=>{
        const users = await Users.find().select('-password').exec();
        return res.status(200).send(users);
    }
}

module.exports = UserController;
