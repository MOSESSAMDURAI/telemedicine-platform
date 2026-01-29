const crypto = require('crypto');

const secret = process.env.JWT_SECRET || 'secret_key'; // Use a proper secret in prod
const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(secret, 'salt', 32);
const iv = Buffer.alloc(16, 0); // For prototype simplicity (use random IV in prod)

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decrypt = (text) => {
    if (!text) return text;
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = { encrypt, decrypt };
