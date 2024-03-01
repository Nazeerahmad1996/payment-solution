// main.js

document.addEventListener('DOMContentLoaded', function () {
  const paymentForm = document.getElementById('paymentForm');

  if (paymentForm) {
    paymentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      submitForm();
    });
  }
});

function submitForm() {
  const formData = {
    amount: document.getElementById('amount').value,
    currency: document.getElementById('currency').value,
    customerName: document.getElementById('customerName').value,
    cardHolderName: document.getElementById('cardHolderName').value,
    cardNumber: document.getElementById('cardNumber').value,
    cardExpiration: document.getElementById('cardExpiration').value,
    cardCCV: document.getElementById('cardCCV').value,
  };

  fetch('/payment/process-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    console.error(data);
    if (!data.success) {
      alert(data.message + ". " + data.error);
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert(error);
  });
}
