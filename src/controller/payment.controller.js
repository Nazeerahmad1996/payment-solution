const braintree = require('braintree');
const config = require('../config/index');
const { saveOrder } = require('../services/payment.service');
const { generateEncryptionKey, encryptData } = require('../services/encryption.service');

const gateway = new braintree.BraintreeGateway({ ...config.braintreeConfig, environment: braintree.Environment.Sandbox });

async function processPayment(req, res) {
  const { amount, currency, customerName, cardHolderName, cardNumber, cardExpiration, cardCCV } = req.body;


  const encryptionKey = generateEncryptionKey();

  // Create a Braintree transaction using Credit Card details
  try {
    const result = await gateway?.transaction?.sale({
      amount,
      creditCard: {
        cardholderName: cardHolderName,
        number: cardNumber,
        expirationDate: cardExpiration,
        cvv: cardCCV,
      },
      options: {
        submitForSettlement: true,
      },
    });

    if (result?.success) {

      // Not storing CVV for security reasons
      const creditCardDetails = {
        cardHolderName,
        cardNumber: result?.transaction?.creditCard,
        cardExpiration,
      }

      const jsonData = JSON.stringify(creditCardDetails);

      // Encrypt the sensitive data
      const encryptedData = encryptData(jsonData, encryptionKey);

      const orderData = {
        orderId: result?.transaction?.id,
        paymentGatewayResponse: result,
        amount,
        currency,
        customerName,
        creditCardDetails: encryptedData
      };

      saveOrder(orderData);

      return res.json({ success: true, message: 'Payment successful!' });
    } else {
      return res.status(500).json({ success: false, message: 'Payment failed', error: result.message });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Payment failed', error: error.message });
  }
}

module.exports = {
  processPayment
}