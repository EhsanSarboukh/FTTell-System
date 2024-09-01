const crypto = require('crypto'); // Import the crypto module for cryptographic functions
require('dotenv').config(); // Load environment variables from a .env file

// Create a Buffer from the environment variable 'key' which is expected to be in hexadecimal format
const key = Buffer.from(process.env.key, 'hex'); 

// Create a Buffer from the environment variable 'iv' which is expected to be a UTF-8 string
const iv = Buffer.from(process.env.iv, 'utf8'); // The IV (Initialization Vector) should be 16 bytes for AES-256-CBC

function encrypt(text) {
    // Create a cipher using AES-256-CBC algorithm, with the provided key and IV
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    // Encrypt the text input, outputting it in hexadecimal format
    let encrypted = cipher.update(text, 'utf8', 'hex');
    
    // Finalize the encryption process and concatenate any remaining encrypted data
    encrypted += cipher.final('hex');
    
    return encrypted; // Return the complete encrypted string in hexadecimal format
}

function decrypt(encryptedText) {
    // Create a decipher using AES-256-CBC algorithm, with the provided key and IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    // Decrypt the input text, which is in hexadecimal format, converting it back to UTF-8
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    
    // Finalize the decryption process and concatenate any remaining decrypted data
    decrypted += decipher.final('utf8');
    
    return decrypted; // Return the complete decrypted string in UTF-8 format
}

module.exports = {
    encrypt,
    decrypt
}; // Export the encrypt and decrypt functions for use in other parts of the application
