const crypto = require('crypto')


function generateEncryptionKey() {
    return crypto.randomBytes(32);
  }
  
  function encryptData(data, key) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
  
    return Buffer.concat([iv, encryptedData, tag]);
  }


 module.exports = {
    generateEncryptionKey,
    encryptData
  }