import React, {useState} from 'react';
import './App.css';
import KDC from './KDC/KDC';
import Users from './Users/Users';
var aesjs = require('aes-js');

function App() {
  const [bob, setBob] = useState({
    id: "bobId",
    key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    sessionKey: null,
    nOnce: null,
    validateFunction: (nonce) => { return nonce+1 },
    generateNonce: () => { return 5 },
  })
  const [alice, setAlice] = useState({
    id: "aliceId",
    key: [15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0],
    sessionKey: null,
    nOnce: null,
    validateFunction: (nonce) => { return nonce+1 },
    generateNonce: () => { return 8 },
  })
  // bob A B

  // bob == bobId

  // encrypt(bobId, key) == A

  // D(A) == bob


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

  return (
    <div className="App">
      <KDC />
      <Users />
    </div>
  );
}

export default App;
