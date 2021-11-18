const Produto = require('../models/produto-controle');

 const ProdutoController = {
    getProdState : async (req, res) =>{
        const prod = await Produto.findOne({id:req.body.id}).exec();
        if (prod.state=="on") return res.status(201).send("isOpen"); 
        else  return res.status(201).send("isClose");
    }
}

module.exports = ProdutoController;