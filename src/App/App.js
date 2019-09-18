import React, {useState} from 'react';
import './App.css';
import KDC from '../KDC/KDC';
import Users from '../Users/Users';

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

  return (
    <div className="App">
      <KDC />
      <Users />
    </div>
  );
}

export default App;
