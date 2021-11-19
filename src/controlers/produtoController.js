const Produto = require('../models/produto-controle');

 const ProdutoController = {
    createProd : async (req, res)=>{
        const { name, description, state } = req.body;
        const dados = await Users.create({ name, description, state });
        return res.status(201).send("Create");
    },
    getProdState : async (req, res) =>{
        const { name } = req.body.name;
        const prod = await Produto.findOne({name}).exec();
        console.log(prod);
        if (prod.state=="on") return res.status(201).send("isOpen"); 
        else  return res.status(201).send("isClose");
    }
}

module.exports = ProdutoController;