/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { PieToken, PieTokenInterface } from "../../contracts/PieToken";

const _abi = [
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600981526020017f50696520546f6b656e00000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f5049450000000000000000000000000000000000000000000000000000000000815250816003908051906020019062000096929190620000b8565b508060049080519060200190620000af929190620000b8565b505050620001cd565b828054620000c69062000168565b90600052602060002090601f016020900481019282620000ea576000855562000136565b82601f106200010557805160ff191683800117855562000136565b8280016001018555821562000136579182015b828111156200013557825182559160200191906001019062000118565b5b50905062000145919062000149565b5090565b5b80821115620001645760008160009055506001016200014a565b5090565b600060028204905060018216806200018157607f821691505b602082108114156200019857620001976200019e565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6118fe80620001dd6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806340c10f191161008c5780639dc29fac116100665780639dc29fac14610228578063a457c2d714610244578063a9059cbb14610274578063dd62ed3e146102a4576100cf565b806340c10f19146101be57806370a08231146101da57806395d89b411461020a576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063313ce56714610170578063395093511461018e575b600080fd5b6100dc6102d4565b6040516100e9919061121b565b60405180910390f35b61010c60048036038101906101079190610fd9565b610366565b6040516101199190611200565b60405180910390f35b61012a610389565b604051610137919061139d565b60405180910390f35b61015a60048036038101906101559190610f86565b610393565b6040516101679190611200565b60405180910390f35b6101786103c2565b60405161018591906113b8565b60405180910390f35b6101a860048036038101906101a39190610fd9565b6103cb565b6040516101b59190611200565b60405180910390f35b6101d860048036038101906101d39190610fd9565b610402565b005b6101f460048036038101906101ef9190610f19565b610459565b604051610201919061139d565b60405180910390f35b6102126104a1565b60405161021f919061121b565b60405180910390f35b610242600480360381019061023d9190610fd9565b610533565b005b61025e60048036038101906102599190610fd9565b61058a565b60405161026b9190611200565b60405180910390f35b61028e60048036038101906102899190610fd9565b610601565b60405161029b9190611200565b60405180910390f35b6102be60048036038101906102b99190610f46565b610624565b6040516102cb919061139d565b60405180910390f35b6060600380546102e390611501565b80601f016020809104026020016040519081016040528092919081815260200182805461030f90611501565b801561035c5780601f106103315761010080835404028352916020019161035c565b820191906000526020600020905b81548152906001019060200180831161033f57829003601f168201915b5050505050905090565b6000806103716106ab565b905061037e8185856106b3565b600191505092915050565b6000600254905090565b60008061039e6106ab565b90506103ab85828561087e565b6103b685858561090a565b60019150509392505050565b60006012905090565b6000806103d66106ab565b90506103f78185856103e88589610624565b6103f291906113ef565b6106b3565b600191505092915050565b61040b33610b8b565b1561044b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610442906112dd565b60405180910390fd5b6104558282610bae565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600480546104b090611501565b80601f01602080910402602001604051908101604052809291908181526020018280546104dc90611501565b80156105295780601f106104fe57610100808354040283529160200191610529565b820191906000526020600020905b81548152906001019060200180831161050c57829003601f168201915b5050505050905090565b61053c33610b8b565b1561057c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610573906112dd565b60405180910390fd5b6105868282610d0e565b5050565b6000806105956106ab565b905060006105a38286610624565b9050838110156105e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105df9061135d565b60405180910390fd5b6105f582868684036106b3565b60019250505092915050565b60008061060c6106ab565b905061061981858561090a565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610723576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071a9061133d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610793576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078a9061127d565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610871919061139d565b60405180910390a3505050565b600061088a8484610624565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461090457818110156108f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ed9061129d565b60405180910390fd5b61090384848484036106b3565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561097a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109719061131d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156109ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e19061123d565b60405180910390fd5b6109f5838383610ee5565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a7b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a72906112bd565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b0e91906113ef565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b72919061139d565b60405180910390a3610b85848484610eea565b50505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c1e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c159061137d565b60405180910390fd5b610c2a60008383610ee5565b8060026000828254610c3c91906113ef565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610c9191906113ef565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610cf6919061139d565b60405180910390a3610d0a60008383610eea565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610d7e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d75906112fd565b60405180910390fd5b610d8a82600083610ee5565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610e10576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e079061125d565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160026000828254610e679190611445565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610ecc919061139d565b60405180910390a3610ee083600084610eea565b505050565b505050565b505050565b600081359050610efe8161189a565b92915050565b600081359050610f13816118b1565b92915050565b600060208284031215610f2f57610f2e611591565b5b6000610f3d84828501610eef565b91505092915050565b60008060408385031215610f5d57610f5c611591565b5b6000610f6b85828601610eef565b9250506020610f7c85828601610eef565b9150509250929050565b600080600060608486031215610f9f57610f9e611591565b5b6000610fad86828701610eef565b9350506020610fbe86828701610eef565b9250506040610fcf86828701610f04565b9150509250925092565b60008060408385031215610ff057610fef611591565b5b6000610ffe85828601610eef565b925050602061100f85828601610f04565b9150509250929050565b6110228161148b565b82525050565b6000611033826113d3565b61103d81856113de565b935061104d8185602086016114ce565b61105681611596565b840191505092915050565b600061106e6023836113de565b9150611079826115a7565b604082019050919050565b60006110916022836113de565b915061109c826115f6565b604082019050919050565b60006110b46022836113de565b91506110bf82611645565b604082019050919050565b60006110d7601d836113de565b91506110e282611694565b602082019050919050565b60006110fa6026836113de565b9150611105826116bd565b604082019050919050565b600061111d6019836113de565b91506111288261170c565b602082019050919050565b60006111406021836113de565b915061114b82611735565b604082019050919050565b60006111636025836113de565b915061116e82611784565b604082019050919050565b60006111866024836113de565b9150611191826117d3565b604082019050919050565b60006111a96025836113de565b91506111b482611822565b604082019050919050565b60006111cc601f836113de565b91506111d782611871565b602082019050919050565b6111eb816114b7565b82525050565b6111fa816114c1565b82525050565b60006020820190506112156000830184611019565b92915050565b600060208201905081810360008301526112358184611028565b905092915050565b6000602082019050818103600083015261125681611061565b9050919050565b6000602082019050818103600083015261127681611084565b9050919050565b60006020820190508181036000830152611296816110a7565b9050919050565b600060208201905081810360008301526112b6816110ca565b9050919050565b600060208201905081810360008301526112d6816110ed565b9050919050565b600060208201905081810360008301526112f681611110565b9050919050565b6000602082019050818103600083015261131681611133565b9050919050565b6000602082019050818103600083015261133681611156565b9050919050565b6000602082019050818103600083015261135681611179565b9050919050565b600060208201905081810360008301526113768161119c565b9050919050565b60006020820190508181036000830152611396816111bf565b9050919050565b60006020820190506113b260008301846111e2565b92915050565b60006020820190506113cd60008301846111f1565b92915050565b600081519050919050565b600082825260208201905092915050565b60006113fa826114b7565b9150611405836114b7565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561143a57611439611533565b5b828201905092915050565b6000611450826114b7565b915061145b836114b7565b92508282101561146e5761146d611533565b5b828203905092915050565b600061148482611497565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b838110156114ec5780820151818401526020810190506114d1565b838111156114fb576000848401525b50505050565b6000600282049050600182168061151957607f821691505b6020821081141561152d5761152c611562565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f63616c6c65722063616e6e6f7420626520636f6e747261637400000000000000600082015250565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6118a381611479565b81146118ae57600080fd5b50565b6118ba816114b7565b81146118c557600080fd5b5056fea26469706673582212204b9e1ddf4b2af5cd0822e0f2afd20d049e2d9bf77e10ffe26d19a4d9151935b164736f6c63430008070033";

type PieTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PieTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PieToken__factory extends ContractFactory {
  constructor(...args: PieTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PieToken> {
    return super.deploy(overrides || {}) as Promise<PieToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PieToken {
    return super.attach(address) as PieToken;
  }
  override connect(signer: Signer): PieToken__factory {
    return super.connect(signer) as PieToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PieTokenInterface {
    return new utils.Interface(_abi) as PieTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PieToken {
    return new Contract(address, _abi, signerOrProvider) as PieToken;
  }
}
