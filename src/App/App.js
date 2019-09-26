import React, {useState} from 'react';
import './App.css';
import KDC from '../KDC/KDC';
import Users from '../Users/Users';
import {generateUniquekey} from '../Utils/utils';

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
  const [kdc, setKdc] = useState({
    bob: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    alice: [15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0],
    sessionKey: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  })
  // bob A B
  const requireSessionKey = (userFrom, userTo, nonce) => {

  }
  // bob == bobId

  // encrypt(bobId, key) == A

  // D(A) == bob

  return (
    <div className="App">
      {/* <button onClick={() => requireSessionKey(bob, alice, generateUniquekey())}  label="`Bob asks session key" /> */}
      <KDC />
      <Users />
    </div>
  );
}

export default App;
