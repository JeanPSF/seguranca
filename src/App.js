import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
var aesjs = require('aes-js');

function App() {
  const key_128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [toEncrypt, setToEncrypt] = useState("Hellow world!") 
  const [toDecrypt, setToDecrypt] = useState() 

  const encrypt = () => {
    // https://github.com/ricmoo/aes-js
    let textBytes = aesjs.utils.utf8.toBytes(toEncrypt)
    //console.log('String to byte: ', textBytes)
    // Generate the encryption mode with a specific key
    let aesController = new aesjs.ModeOfOperation.ctr(key_128, new aesjs.Counter(5))
    let encryptedBytes = aesController.encrypt(textBytes)
    //console.log('encrypted bytes: ', encryptedBytes)
    let encryptedToHex = aesjs.utils.hex.fromBytes(encryptedBytes)
    //console.log('encrypted hex: ', encryptedToHex)
    setToDecrypt(encryptedToHex)
  }

  const decrypt = () => {
    var encryptedBytes = aesjs.utils.hex.toBytes(toDecrypt);
    let aesController = new aesjs.ModeOfOperation.ctr(key_128, new aesjs.Counter(5))
    var decryptedBytes = aesController.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    setToEncrypt(decryptedText)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <span>Encrypting: <input value={toEncrypt} onChange={(event) => setToEncrypt(event.target.value)}></input></span>
        <button onClick={() => encrypt()}>Encrypt</button>
        <span>Decrypted: <input value={toDecrypt} onChange={(event) => {console.log(event.target.value); setToDecrypt(event.target.value)}}></input></span>
        <button onClick={() => decrypt()}>Decrypt</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
