// src/components/RegisterBeneficiary.js
import React, { useState } from 'react';
import socialSecurity from '../SocialSecurity';
import web3 from '../web3';

const RegisterBeneficiary = () => {
  const [address, setAddress] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const register = async () => {
    const accounts = await web3.eth.getAccounts();
    await socialSecurity.methods.registerBeneficiary(address, id, name).send({ from: accounts[0] });
  };

  return (
    <div>
      <h2>Register Beneficiary</h2>
      <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
      <input value={id} onChange={e => setId(e.target.value)} placeholder="ID" />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default RegisterBeneficiary;
