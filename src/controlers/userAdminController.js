const UserAdmin = require('../models/userAdmin');
const bcrypt = require('bcrypt')

const UserAdminController ={
    createUserAdmin : async (req, res)=>{
        const { username, password } = req.body;
        bcrypt.hash(password,10,async function (err, encrypted){
            if (!encrypted) return res.status(200).send("Erro");
            const ps = encrypted;
            const user = await UserAdmin.create({ username, "password": ps });
            user.password = undefined;
            return res.status(201).send("Create");
            }) 
    },
    signinAdimin : async (req, res)=>{
        const { username, password } = req.body;
        const userCheck = await UserAdmin.findOne({username, password}).exec();
        if (userCheck) res.status(200).send("Ok.");
        else return res.status(200).send("erro");  
    },
    changePassword : async (req, res)=>{
        const { username, password } = req.body;
        const userCheck = await UserAdmin.updateOne({username}, {password}).exec();
      
        if (userCheck) res.status(200).send("Ok");
    }
}

module.exports = UserAdminController;