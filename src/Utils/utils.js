var aesjs = require('aes-js');

export const generateUniquekey = () => {
  return Date.now().toString(36) + '_' + Math.random().toString(36).slice(2);
}
export const parseStringToKey = (stringKey) => {
  return stringKey.split('-')
}


export const encrypt = (key, msg) => {
  let parsedKey = key.map(Number)
  // https://github.com/ricmoo/aes-js
  let textBytes = aesjs.utils.utf8.toBytes(msg)
  //console.log('String to byte: ', textBytes)
  // Generate the encryption mode with a specific key
  let aesController = new aesjs.ModeOfOperation.ctr(parsedKey, new aesjs.Counter(5))
  let encryptedBytes = aesController.encrypt(textBytes)
  //console.log('encrypted bytes: ', encryptedBytes)
  let encryptedToHex = aesjs.utils.hex.fromBytes(encryptedBytes)
  //console.log('encrypted hex: ', encryptedToHex)
  return encryptedToHex
}
export const decrypt = (key, msg) => {
  console.log(key)
  let parsedKey = key.map(Number)
  var encryptedBytes = aesjs.utils.hex.toBytes(msg);
  let aesController = new aesjs.ModeOfOperation.ctr(parsedKey, new aesjs.Counter(5))
  var decryptedBytes = aesController.decrypt(encryptedBytes);
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText
}