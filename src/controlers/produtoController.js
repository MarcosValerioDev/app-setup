const Produto = require('../models/produto-controle');

 const ProdutoController = {
    getProdState : async (req, res) =>{
        const { name } = req.body.name;
        const prod = await Produto.findOne({name}).exec();
        console.log(prod);
        if (prod.state=="on") return res.status(201).send("isOpen"); 
        else  return res.status(201).send("isClose");
    }
}

module.exports = ProdutoController;