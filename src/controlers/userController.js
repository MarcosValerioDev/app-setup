const Users = require('../models/user');

const UserController ={
    createuser : async (req, res)=>{
        const { name, password, email } = req.body;
        const userCheck = await Users.findOne({ email, password }).exec();
        if (!userCheck.email == email) return res.status(201).send("Existe"); 
        
        const user = await Users.create({name, password, email});
        user.password = undefined;
        return res.status(201).send("Create");
    },
    signin : async (req, res) =>{
        const { email, password } = req.body;
        const user = await Users.findOne({ email, password }).exec();
        if (!user) return res.status(201).send("isSigned"); 
        else  return res.status(201).send("notSigned");
    }
}

module.exports = UserController;