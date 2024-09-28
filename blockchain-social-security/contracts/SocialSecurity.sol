// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialSecurity {
    struct Beneficiary {
        uint id;
        string name;
        uint balance;
    }

    mapping(address => Beneficiary) public beneficiaries;
    uint public beneficiaryCount;

    function registerBeneficiary(address _address, uint _id, string memory _name) public {
        beneficiaries[_address] = Beneficiary(_id, _name, 0);
        beneficiaryCount++;
    }

    function contribute(address _beneficiary) public payable {
        beneficiaries[_beneficiary].balance += msg.value;
    }

    function withdraw(uint _amount) public {
        require(beneficiaries[msg.sender].balance >= _amount, "Insufficient balance");
        beneficiaries[msg.sender].balance -= _amount;
        payable(msg.sender).transfer(_amount);
    }
}
