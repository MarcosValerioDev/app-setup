const Produto = require('../models/produto-controle');

 const ProdutoController = {
    getProdState : async (req, res) =>{
        const prod = await Produto.findOne({name:req.body.name}).exec();
        if (prod.state=="on") return res.status(201).send("isOpen"); 
        else  return res.status(201).send("isClose");
    }
}

module.exports = ProdutoController;