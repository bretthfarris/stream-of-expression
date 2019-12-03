const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const dotenv = require('dotenv');
const iv = crypto.randomBytes(16);

dotenv.config();

module.exports = { 
  encrypt: function(text) {
    var cipher = crypto.createCipheriv(algorithm, Buffer.from(process.env.ENCRYPTION_KEY), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  },
  decrypt: function(text) {
    var iv = Buffer.from(text.iv, 'hex');
    var encryptedText = Buffer.from(text.encryptedData, 'hex');
    var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}