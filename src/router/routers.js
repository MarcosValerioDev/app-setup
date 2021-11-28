const express = require('express');
const router = express.Router();
const UserController = require('../controlers/userController');
const ProdutoController = require('../controlers/produtoController');


// router.get('/', async (req, res) => {
//     try {
//         const users = await Users.find({});
//         return res.send(users);
//     }
//     catch (err) {
//         return res.status(500).send({ error: 'Erro na consulta de usuários!' });
//     }
// });

router.post('/createUser', UserController.createuser);
router.post('/siginin', UserController.signin);
router.post('/getProdState', ProdutoController.getProdState);
router.post('/createProd', ProdutoController.createProd);
router.get('/getProds', ProdutoController.getProds);
router.post('/alteraStateProd', ProdutoController.alteraStateProd);



module.exports = router; 