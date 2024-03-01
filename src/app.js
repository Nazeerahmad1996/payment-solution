const express = require('express');
require('dotenv').config();
const helmet = require("helmet");
const path = require('path');

const paymentRouter = require('./routes/payment/process.router');

const app = express();

// Use express.json() middleware to parse JSON in the request body
app.use(express.json());

// Use Helmet for security!
app.use(helmet());

// // Serve static files from the 'utils' directory
app.use(express.static(path.join(__dirname, 'utils')));

// setup pug for server side rendering
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));


// Render Form
app.get('/', (req, res) => {
    res.status(200).render('form.view.pug');
})

// Routers
app.use('/payment',paymentRouter);

module.exports = app;