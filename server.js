require('dotenv').config({ quiet: true })
const express = require('express');

const mongoose = require('mongoose');
const url = process.env.STRING_MONGO;

mongoose.connection.on('connected', ()=>{ console.log('Aplicação connectada ao banco de dados.'); })
mongoose.connection.on('error', (err)=>{ console.log('Erro na conexão com o banco de dados: '+err); })
mongoose.connection.on('disconnected', ()=>{ console.log('Aplicação desconectada do banco de dados.'); })
mongoose.connect(url).catch(()=>{ /* tratado no evento 'error' */ });

const app = express();
const cors = require('cors');
const router = require('./src/router/routers');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// No Express 5, req.body fica undefined quando não há corpo na requisição
app.use((req, res, next)=>{ req.body ??= {}; next(); });

app.use(router);

// Erros lançados nos controllers async são encaminhados para cá pelo Express 5
app.use((err, req, res, next)=>{
    console.log('Erro na requisição: '+err);
    return res.status(500).send("Erro");
});

const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log(`Servidor conectado ${port}`));
