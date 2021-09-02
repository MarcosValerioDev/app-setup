const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./src/router/routers');
const mongoose = require('mongoose');




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const url = 'mongodb+srv://user-teste01:mongoapi@cluster0.2rtcq.mongodb.net/empresa?retryWrites=true&w=majority';
const options = {useNewUrlParser: true };

mongoose.connect(url, options);
//mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err)=>{
    console.log('Erro na conexão com o banco de dados: '+err);
})

mongoose.connection.on('disconnected', ()=>{
    console.log('Aplicação desconectada do banco de dados.');
})

mongoose.connection.on('error', (err)=>{
    console.log('Erro na conexão com o banco de dados: '+err);
})

mongoose.connection.on('connected', ()=>{
    console.log('Aplicação connectada ao banco de dados.');
})

app.use(router);

app.listen(process.env.PORT || 4000);
