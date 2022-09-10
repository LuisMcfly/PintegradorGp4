const express = require('express');
const app = express();
const path = require('path');
// const http = require('http');
// const server = http.createServer((req, res) => {res.end("response ended")})

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));
//app.get('/Home', (req, res) => res.sendFile(path.join(__dirname, '/views/home.html')));
app.get('/productDetail.html', (req, res) => res.sendFile(path.join(__dirname, '/views/productDetail.html')));
app.get('/productCart.html', (req, res) => res.sendFile(path.join(__dirname, '/views/productCart.html')));
app.get('/register.html', (req, res) => res.sendFile(path.join(__dirname, '/views/register.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, '/views/login.html')));

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));