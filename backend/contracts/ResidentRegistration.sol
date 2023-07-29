// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "./../node_modules/@openzeppelin/contracts/access/Ownable.sol";

struct Address {
    string street;
    string city;
    string state;
    uint zip;
}

struct Resident {
    string name;
    uint age;
    uint taxDept;
    uint income;
    Address addr;
}
struct ResidentManagement {
    uint totalResident;
    mapping(address => Resident) residentList;
    address[] residentAddresses;
}

contract ResidentRegistration is Ownable {
    ResidentManagement public residentManagement;
    uint public taxRate = 10;

    constructor() {
        residentManagement.totalResident = 0;
    }

    // owner functions
    //set tax rate
    function setTaxRate(uint _taxRate) public onlyOwner {
        taxRate = _taxRate;
    }

    function getAllResident() public view returns (address[] memory) {
        return residentManagement.residentAddresses;
    }

    function getResident(address _addr) public view returns (Resident memory) {
        return residentManagement.residentList[_addr];
    }

    function searchResidentByName(
        string memory _name
    ) public view returns (Resident memory) {
        for (uint i = 0; i < residentManagement.residentAddresses.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(
                        residentManagement
                            .residentList[
                                residentManagement.residentAddresses[i]
                            ]
                            .name
                    )
                ) == keccak256(abi.encodePacked(_name))
            ) {
                return
                    residentManagement.residentList[
                        residentManagement.residentAddresses[i]
                    ];
            }
        }
        revert("Resident not found");
    }
    // owner functions end

      // resident functions

      function registerResident(
         string memory _name,
         uint _age,
         uint _income,
         string memory _street,
         string memory _city,
         string memory _state,
         uint _zip
       ) public {
         require(
           residentManagement.residentList[msg.sender].age == 0,
           "Resident already registered"
         );
         residentManagement.residentList[msg.sender].name = _name;
         residentManagement.residentList[msg.sender].age = _age;
         residentManagement.residentList[msg.sender].income = _income;
         residentManagement.residentList[msg.sender].addr.street = _street;
         residentManagement.residentList[msg.sender].addr.city = _city;
         residentManagement.residentList[msg.sender].addr.state = _state;
         residentManagement.residentList[msg.sender].addr.zip = _zip;
         residentManagement.residentAddresses.push(msg.sender);
         residentManagement.totalResident++;
       }

         function updateResident(
            string memory _name,
            uint _age,
            uint _income,
            string memory _street,
            string memory _city,
            string memory _state,
            uint _zip
         ) public {
            require(
            residentManagement.residentList[msg.sender].age != 0,
            "Resident not registered"
            );
            residentManagement.residentList[msg.sender].name = _name;
            residentManagement.residentList[msg.sender].age = _age;
            residentManagement.residentList[msg.sender].income = _income;
            residentManagement.residentList[msg.sender].addr.street = _street;
            residentManagement.residentList[msg.sender].addr.city = _city;
            residentManagement.residentList[msg.sender].addr.state = _state;
            residentManagement.residentList[msg.sender].addr.zip = _zip;
         }

         function declareIncome(uint _income) public {
            require(
            residentManagement.residentList[msg.sender].age != 0,
            "Resident not registered"
            );
            residentManagement.residentList[msg.sender].income = _income;
            uint tax = (_income * taxRate) / 100;
            residentManagement.residentList[msg.sender].taxDept += tax;
         }

         function payTax() public payable {
            require(
            residentManagement.residentList[msg.sender].age != 0,
            "Resident not registered"
            );
            require(
            residentManagement.residentList[msg.sender].taxDept != 0,
            "No tax dept"
            );
            require(
            residentManagement.residentList[msg.sender].taxDept <= msg.value,
            "Insufficient amount"
            );
            residentManagement.residentList[msg.sender].taxDept - msg.value;
         }


         //  refund unnecessary tax
         function refundTax(address _addr, uint _amount) public onlyOwner {
            require(
            residentManagement.residentList[_addr].age != 0,
            "Resident not registered"
            );
            require(
            residentManagement.residentList[_addr].taxDept != 0,
            "No tax dept"
            );
            require(
            residentManagement.residentList[_addr].taxDept >= _amount,
            "Insufficient amount"
            );
            payable(_addr).transfer(_amount);
            residentManagement.residentList[_addr].taxDept - _amount;
         }

         //login as resident

         function loginAsResident() public view returns (Resident memory) {
            require(
            residentManagement.residentList[msg.sender].age != 0,
            "Resident not registered"
            );
            return residentManagement.residentList[msg.sender];
         }


}
