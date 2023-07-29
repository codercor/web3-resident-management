// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AgeCalculator.sol";

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

contract ResidentRegistration is Ownable, AgeCalculator {
    ResidentManagement public residentManagement;
    uint public taxRate = 10;

    modifier shouldExist() {
        require(
            residentManagement.residentList[msg.sender].age != 0,
            "Resident not registered"
        );
        _;
    }

    modifier shouldNotExist() {
        require(
            residentManagement.residentList[msg.sender].age == 0,
            "Resident already registered"
        );
        _;
    }

    modifier isAdult() {
        require(
            residentManagement.residentList[msg.sender].age >= 18,
            "The resident is not adult"
        );
        _;
    }

    constructor() {
        residentManagement.totalResident = 0;
    }

    // owner functions
    function setTaxRate(uint _taxRate) public onlyOwner {
        taxRate = _taxRate;
    }

    function getAllResident() public view onlyOwner returns (address[] memory) {
        return residentManagement.residentAddresses;
    }

    function getResident(
        address _addr
    ) public view onlyOwner returns (Resident memory) {
        return residentManagement.residentList[_addr];
    }

    function searchResidentByName(
        string memory _name
    ) public view onlyOwner returns (Resident memory) {
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
    //"selami", "sokak", "samsun", "mahalle", 55800, 31,07,1999
    function registerResident(
        string memory _name,
        string memory _street,
        string memory _city,
        string memory _state,
        uint _zip,
        uint DoBDay,
        uint DoBMonth,
        uint DoBYear
    ) public shouldNotExist {
        residentManagement.residentList[msg.sender].name = _name;
        residentManagement.residentList[msg.sender].age = this.calculateAge(
            DoBDay,
            DoBMonth,
            DoBYear
        );
        residentManagement.residentList[msg.sender].income = 0;
        residentManagement.residentList[msg.sender].taxDept = 0;
        residentManagement.residentList[msg.sender].addr.street = _street;
        residentManagement.residentList[msg.sender].addr.city = _city;
        residentManagement.residentList[msg.sender].addr.state = _state;
        residentManagement.residentList[msg.sender].addr.zip = _zip;
        residentManagement.residentAddresses.push(msg.sender);
        residentManagement.totalResident++;
    }

    function updateResident(
        string memory _name,
        string memory _street,
        string memory _city,
        string memory _state,
        uint _zip,
        uint DoBDay,
        uint DoBMonth,
        uint DoBYear
    ) public shouldExist {
        require(
            residentManagement.residentList[msg.sender].age != 0,
            "Resident not registered"
        );
        residentManagement.residentList[msg.sender].name = _name;
        residentManagement.residentList[msg.sender].age = this.calculateAge(
            DoBDay,
            DoBMonth,
            DoBYear
        );
        residentManagement.residentList[msg.sender].addr.street = _street;
        residentManagement.residentList[msg.sender].addr.city = _city;
        residentManagement.residentList[msg.sender].addr.state = _state;
        residentManagement.residentList[msg.sender].addr.zip = _zip;
    }

    function declareIncome(uint _income) public shouldExist isAdult {
        residentManagement.residentList[msg.sender].income += _income;
        uint tax = (_income * taxRate) / 100;
        residentManagement.residentList[msg.sender].taxDept += tax;
    }

    function payTax() public payable shouldExist isAdult returns (uint) {
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
        residentManagement.residentList[msg.sender].taxDept -= msg.value;
        return msg.value;
    }

    //login as resident
    function getMeResident() public view shouldExist returns (Resident memory) {
        return residentManagement.residentList[msg.sender];
    }

    function getTaxDept() public view shouldExist returns (uint) {
        return residentManagement.residentList[msg.sender].taxDept;
    }
}
