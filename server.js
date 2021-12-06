require('dotenv').config()
const express = require('express');

const mongoose = require('mongoose');
const url = process.env.STRING_MONGO;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(url, options);
mongoose.connection.on('connected', ()=>{ console.log('Aplicação connectada ao banco de dados.'); })
mongoose.connection.on('error', (err)=>{ console.log('Erro na conexão com o banco de dados: '+err); })
mongoose.connection.on('disconnected', ()=>{ console.log('Aplicação desconectada do banco de dados.'); })

const app = express();
const cors = require('cors');
const router = require('./src/router/routers');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(router);
const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log(`Servidor conectado ${port}`));
