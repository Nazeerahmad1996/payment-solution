const express = require('express');
const paymentRouter = express.Router();

const { processPayment  } = require('../../controller/payment.controller');

// Handle payment form submission
paymentRouter.post('/process-payment', processPayment);

module.exports = paymentRouter