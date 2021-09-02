const express = require('express');
const router = express.Router();
const Users = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!' });
    }
});

router.post('/create', async (req, res) => {
   

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({user});

});



module.exports = router;