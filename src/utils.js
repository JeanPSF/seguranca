var aesjs = require('aes-js');

export const generateUniquekey = () => {
    return Date.now().toString(36) + '_' + Math.random().toString(36).slice(2);
}

const encrypt = (key, msg) => {
    // https://github.com/ricmoo/aes-js
    let textBytes = aesjs.utils.utf8.toBytes(msg)
    //console.log('String to byte: ', textBytes)
    // Generate the encryption mode with a specific key
    let aesController = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
    let encryptedBytes = aesController.encrypt(textBytes)
    //console.log('encrypted bytes: ', encryptedBytes)
    let encryptedToHex = aesjs.utils.hex.fromBytes(encryptedBytes)
    //console.log('encrypted hex: ', encryptedToHex)
    return encryptedToHex
  }
  const decrypt = (key, msg) => {
    var encryptedBytes = aesjs.utils.hex.toBytes(msg);
    let aesController = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
    var decryptedBytes = aesController.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText
  }