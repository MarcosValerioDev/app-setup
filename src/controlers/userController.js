const Users = require('../models/user');
const bcrypt = require('bcrypt');
const UserController ={
    createuser : async (req, res)=>{
        const { name, password, email } = req.body;
        const userCheck = await Users.findOne({ email, password }).exec();

        if (userCheck) return res.status(201).send("Existe"); 
        bcrypt.hash(password,10, async function (err, encrypted){
            if (!encrypted) return res.status(200).send("Erro");
            const ps = encrypted;
            const user = await Users.create({name, password:ps, email});
            user.password = undefined;
            return res.status(201).send("Create");
        }) 

       
    },
    alterPassword : async (req, res)=>{
        const { email, password } = req.body;
        bcrypt.hash(password,10, async function (err, encrypted){
            if (!encrypted) return res.status(200).send("Erro");
            const ps = encrypted;
            await Users.updateOne({email}, {"password" : ps}).exec();
        
            return res.status(201).send("2");
        }) 
    },
    signin : async (req, res) =>{
        const { email, password } = req.body;
        const userBuffer = await Users.findOne({ email }).exec();
        const user= JSON.parse(JSON.stringify(userBuffer));
        if (!user) return res.status(201).send("notExist"); 
        const check = await bcrypt.compare(password, user.password);
        if (!check) return res.status(201).send("Erro na autenticação de usuário, confira seus dados.");
        return res.status(201).send(user.name);
    },
    deleteUser: async (req, res)=>{
        const { email } = req.body;
        await Users.deleteOne({ email })
        return res.status(200).send("ok");
    },
    getUsers: async (req, res)=>{
        const users = await Users.find()
        return res.status(200).send(users);
    }
}

module.exports = UserController;