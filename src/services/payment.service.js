const fs = require('fs');

// Function to save order data to a local file
function saveOrder(orderData) {
    const fileName = 'orders.json';

    try {
        // Read existing data from the file
        const existingData = fs.existsSync(fileName) ? JSON.parse(fs.readFileSync(fileName)) : [];

        // Append new order data to the existing data
        existingData.push(orderData);

        // Write the updated data back to the file
        fs.writeFileSync(fileName, JSON.stringify(existingData, null, 2));
    } catch (error) {
        console.error('Error saving order to file:', error.message);
    }
}

module.exports = {
    saveOrder
}