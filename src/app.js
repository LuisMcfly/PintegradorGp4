const express = require('express');
const app = express();
const path = require('path');

const mainRouter = require('./routes/main');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');

// const http = require('http');
// const server = http.createServer((req, res) => {res.end("response ended")})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // siempre se debe hacer cuando views no esté en raíz

app.use(express.static('public'));

app.use('/', mainRouter)
app.use('/products/', productRouter);
app.use('/cart/', cartRouter);
app.use('/', userRouter);

// app.get('/slide.js', (req,res) => res.sendFile(__dirname + '/public/js/slide.js')); 
// reorganizar la ruta para que cargue el slider del index

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));