// src/components/Withdraw.js
import React, { useState } from 'react';
import socialSecurity from '../SocialSecurity';
import web3 from '../web3';

const Withdraw = () => {
  const [amount, setAmount] = useState('');

  const withdraw = async () => {
    const accounts = await web3.eth.getAccounts();
    await socialSecurity.methods.withdraw(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
  };

  return (
    <div>
      <h2>Withdraw</h2>
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount in Ether" />
      <button onClick={withdraw}>Withdraw</button>
    </div>
  );
};

export default Withdraw;
