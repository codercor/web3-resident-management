const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "day",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "month",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "year",
        type: "uint256",
      },
    ],
    name: "calculateAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "residentManagement",
    outputs: [
      {
        internalType: "uint256",
        name: "totalResident",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "taxRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_taxRate",
        type: "uint256",
      },
    ],
    name: "setTaxRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllResident",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "getResident",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "taxDept",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "income",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "street",
                type: "string",
              },
              {
                internalType: "string",
                name: "city",
                type: "string",
              },
              {
                internalType: "string",
                name: "state",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "zip",
                type: "uint256",
              },
            ],
            internalType: "struct Address",
            name: "addr",
            type: "tuple",
          },
        ],
        internalType: "struct Resident",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "searchResidentByName",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "taxDept",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "income",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "street",
                type: "string",
              },
              {
                internalType: "string",
                name: "city",
                type: "string",
              },
              {
                internalType: "string",
                name: "state",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "zip",
                type: "uint256",
              },
            ],
            internalType: "struct Address",
            name: "addr",
            type: "tuple",
          },
        ],
        internalType: "struct Resident",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_street",
        type: "string",
      },
      {
        internalType: "string",
        name: "_city",
        type: "string",
      },
      {
        internalType: "string",
        name: "_state",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_zip",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "DoBDay",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "DoBMonth",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "DoBYear",
        type: "uint256",
      },
    ],
    name: "registerResident",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_street",
        type: "string",
      },
      {
        internalType: "string",
        name: "_city",
        type: "string",
      },
      {
        internalType: "string",
        name: "_state",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_zip",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "DoBDay",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "DoBMonth",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "DoBYear",
        type: "uint256",
      },
    ],
    name: "updateResident",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_income",
        type: "uint256",
      },
    ],
    name: "declareIncome",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payTax",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [],
    name: "getMeResident",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "age",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "taxDept",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "income",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "string",
                name: "street",
                type: "string",
              },
              {
                internalType: "string",
                name: "city",
                type: "string",
              },
              {
                internalType: "string",
                name: "state",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "zip",
                type: "uint256",
              },
            ],
            internalType: "struct Address",
            name: "addr",
            type: "tuple",
          },
        ],
        internalType: "struct Resident",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getTaxDept",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export default abi;