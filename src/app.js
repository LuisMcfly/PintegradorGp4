const express = require('express');
const app = express();
const path = require('path');

const mainRouter = require('./routes/main');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const userRouter = require('./routes/user');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// const http = require('http');
// const server = http.createServer((req, res) => {res.end("response ended")})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // siempre se debe hacer cuando views no esté en raíz

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.use('/', mainRouter)
app.use('/products/', productRouter);
app.use('/cart/', cartRouter);
app.use('/', userRouter);

app.get('/slide.js', (req,res) => res.sendFile(__dirname + '/controllers/sliderController.js')); // Ruta del slider funcionando ! 

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));