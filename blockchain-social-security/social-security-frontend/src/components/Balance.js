import React, { useState, useEffect } from 'react';
import web3 from '../web3';
import SocialSecurity from '../SocialSecurity';

function Balance() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const accounts = await web3.eth.getAccounts();
      const beneficiaryBalance = await SocialSecurity.methods.beneficiaries(accounts[0]).call();
      setBalance(web3.utils.fromWei(beneficiaryBalance.balance.toString(), 'ether'));
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Beneficiary Balance</h2>
      <p>Balance: {balance} Ether</p>
    </div>
  );
}

export default Balance;
