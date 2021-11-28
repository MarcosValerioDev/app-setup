const Produto = require('../models/produto-controle');

 const ProdutoController = {
    createProd : async (req, res)=>{
        const { name, description, state } = req.body;
        const dados = await Produto.create({ name, description, state });
        return res.status(201).send("Create");
    },
    getProdState : async (req, res) =>{
        const { name } = req.body;
        const prod = await Produto.findOne({name}).exec();
        if (prod.state=="on") return res.status(201).send("isOpen"); 
        else  return res.status(201).send("isClose");
    },
    getProds : async (req, res) =>{
        const prod = await Produto.find();
        if (prod) return res.status(201).send({"cod":"0",prod}); 
        else  return res.status(201).send({"cod":"1","msg":"Nenhum produto encontrado."});
    },
    alteraStateProd: async (req, res) =>{
        const { _id, state } = req.body;
        await Produto.updateOne({_id}, {state});
        const prod = await Produto.find();
        if (prod) return res.status(201).send({"cod":"0",prod}); 
        else  return res.status(201).send({"cod":"1","msg":"Nenhum produto encontrado."});
    }
}

module.exports = ProdutoController;