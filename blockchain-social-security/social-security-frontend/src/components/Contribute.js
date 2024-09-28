// src/components/Contribute.js
import React, { useState } from 'react';
import socialSecurity from '../SocialSecurity';
import web3 from '../web3';

const Contribute = () => {
  const [beneficiary, setBeneficiary] = useState('');
  const [amount, setAmount] = useState('');

  const contribute = async () => {
    const accounts = await web3.eth.getAccounts();
    await socialSecurity.methods.contribute(beneficiary).send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether')
    });
  };

  return (
    <div>
      <h2>Contribute</h2>
      <input value={beneficiary} onChange={e => setBeneficiary(e.target.value)} placeholder="Beneficiary Address" />
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount in Ether" />
      <button onClick={contribute}>Contribute</button>
    </div>
  );
};

export default Contribute;
