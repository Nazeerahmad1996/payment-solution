module.exports = {
    PORT: process.env.PORT || 3000,
    braintreeConfig: {
        environment: '',
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
    }
    // Other configuration options...
};
  