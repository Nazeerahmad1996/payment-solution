const request = require('supertest');

const app = require('../../app'); // Adjust the path as needed
// Tests
describe('Payment API', () => {
  it('should process payment successfully', async () => {
    const paymentData = {
      "amount": "23",
      "currency": "USD",
      "customerName": "Nazeer Ahmed",
      "cardHolderName": "Nazeer",
      "cardNumber": "4111111111111111",
      "cardExpiration": "12/23",
      "cardCCV": "123"
    };

    const response = await request(app)
      .post('/payment/process-payment')
      .send(paymentData);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  }, 10000);

  it('should handle invalid CVV payment data', async () => {
    const invalidCVVPaymentData = {
      "amount": "23",
      "currency": "USD",
      "customerName": "Nazeer Ahmed",
      "cardHolderName": "Nazeer",
      "cardNumber": "4111111111111111",
      "cardExpiration": "12/23",
      "cardCCV": "12344"
    };

    const response = await request(app)
      .post('/payment/process-payment')
      .send(invalidCVVPaymentData);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
  },10000);

  it('should handle invalid card number payment data', async () => {
    const invalidCVVPaymentData = {
      "amount": "23",
      "currency": "USD",
      "customerName": "Nazeer Ahmed",
      "cardHolderName": "Nazeer",
      "cardNumber": "411111111111",
      "cardExpiration": "12/23",
      "cardCCV": "124"
    };

    const response = await request(app)
      .post('/payment/process-payment')
      .send(invalidCVVPaymentData);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
  }, 10000);

  it('should handle invalid date payment data', async () => {
    const invalidCVVPaymentData = {
      "amount": "23",
      "currency": "USDAD",
      "customerName": "Nazeer Ahmed",
      "cardHolderName": "Nazeer",
      "cardNumber": "4111111111111111",
      "cardExpiration": "122/23",
      "cardCCV": "124"
    };

    const response = await request(app)
      .post('/payment/process-payment')
      .send(invalidCVVPaymentData);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
  }, 10000);

});
