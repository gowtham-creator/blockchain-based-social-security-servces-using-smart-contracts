import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import SocialSecurityContract from './contracts/SocialSecurity.json';

import './App.css';
import RegisterBeneficiary from './components/RegisterBeneficiary';
import Contribute from './components/Contribute';
import Withdraw from './components/Withdraw';
import Balance from './components/Balance';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [socialSecurity, setSocialSecurity] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState({});

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          return web3;
        } else if (window.web3) {
          return new Web3(window.web3.currentProvider);
        } else {
          console.warn("No web3 detected. Falling back to http://127.0.0.1:7545.");
          return new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        }
      } catch (error) {
        console.error("Failed to initialize web3:", error);
        return null;
      }
    };

    const loadBlockchainData = async () => {
      const web3 = await initWeb3();
      if (!web3) return;

      setWeb3(web3);

      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          console.error("No accounts found.");
          return;
        }
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SocialSecurityContract.networks[networkId];
        if (!deployedNetwork) {
          console.error("Smart contract not deployed on the detected network.");
          return;
        }

        const socialSecurityInstance = new web3.eth.Contract(
          SocialSecurityContract.abi,
          deployedNetwork.address
        );
        setSocialSecurity(socialSecurityInstance);

        // Fetch beneficiaries and update state
        const beneficiaryCount = await socialSecurityInstance.methods.beneficiaryCount().call();
        const beneficiariesData = {};
        for (let i = 0; i < beneficiaryCount; i++) {
          const address = await socialSecurityInstance.methods.getBeneficiaryAddressByIndex(i).call();
          const beneficiary = await socialSecurityInstance.methods.beneficiaries(address).call();
          beneficiariesData[address] = beneficiary;
        }
        setBeneficiaries(beneficiariesData);
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };

    loadBlockchainData();
  }, []);

  const registerBeneficiary = async (address, id, name) => {
    if (socialSecurity && account) {
      try {
        await socialSecurity.methods.registerBeneficiary(address, id, name).send({
          from: account,
          gas: 5000000, // Increase gas limit
        });
        console.log("Beneficiary registered successfully!");
      } catch (error) {
        console.error("Error in registerBeneficiary:", error);
      }
    } else {
      console.error("Contract or account not loaded");
    }
  };

  const contribute = async (beneficiaryAddress, amount) => {
    if (socialSecurity && account) {
      try {
        await socialSecurity.methods.contribute(beneficiaryAddress).send({
          from: account,
          value: web3.utils.toWei(amount, 'ether'),
          gas: 5000000, // Increase gas limit
        });
        console.log("Contribution successful!");
      } catch (error) {
        console.error("Error in contribute:", error);
      }
    } else {
      console.error("Contract or account not loaded");
    }
  };

  const withdraw = async (amount) => {
    if (socialSecurity && account) {
      try {
        await socialSecurity.methods.withdraw(web3.utils.toWei(amount, 'ether')).send({
          from: account,
          gas: 5000000, // Increase gas limit
        });
        console.log("Withdrawal successful!");
      } catch (error) {
        console.error("Error in withdraw:", error);
      }
    } else {
      console.error("Contract or account not loaded");
    }
  };

  const getBalance = async (address) => {
    if (socialSecurity) {
      try {
        const beneficiary = await socialSecurity.methods.beneficiaries(address).call();
        return web3.utils.fromWei(beneficiary.balance.toString(), 'ether');
      } catch (error) {
        console.error("Error in getBalance:", error);
        return "0";
      }
    } else {
      console.error("Contract not loaded");
      return "0";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blockchain-Enabled Social Security Services</h1>
      </header>
      <main>
        <RegisterBeneficiary registerBeneficiary={registerBeneficiary} />
        <Contribute contribute={contribute} />
        <Withdraw withdraw={withdraw} />
        <Balance getBalance={getBalance} beneficiaries={beneficiaries} />
      </main>
    </div>
  );
}

export default App;
