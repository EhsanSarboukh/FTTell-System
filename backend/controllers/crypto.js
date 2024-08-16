const crypto = require('crypto');
require('dotenv').config();
const key = Buffer.from(process.env.key, 'hex'); // Replace with your actual key
const iv = Buffer.from(process.env.iv, 'utf8'); // This is a simple example IV

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted; // No need to store IV separately since it's static
}

function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = {
    encrypt,
    decrypt
}