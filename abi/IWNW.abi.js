const WNW_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'betUp',
        type: 'bool'
      }
    ],
    name: 'bet',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'betUp',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'BetPlaced',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256'
      }
    ],
    name: 'Claimed',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'category',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'startPrice',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'gameTitle',
        type: 'string'
      }
    ],
    name: 'createGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'depositBNB',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'lastPrice',
        type: 'uint256'
      }
    ],
    name: 'endGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      }
    ],
    name: 'GameCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lastPrice',
        type: 'uint256'
      }
    ],
    name: 'GameEnded',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'withdrawBNB',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  },
  {
    inputs: [],
    name: 'burnAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'gameCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'games',
    outputs: [
      {
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'gameTitle',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'startPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'upAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'downAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'prizeAmount',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'category',
        type: 'string'
      },
      {
        internalType: 'bool',
        name: 'isEnded',
        type: 'bool'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getActiveGameList',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'gameId',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'gameTitle',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'startPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'upAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'downAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'prizeAmount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'category',
            type: 'string'
          },
          {
            internalType: 'bool',
            name: 'isEnded',
            type: 'bool'
          },
          {
            internalType: 'address[]',
            name: 'betUsers',
            type: 'address[]'
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string'
          }
        ],
        internalType: 'struct BetMeme.Game[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getEndedGameList',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'gameId',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'gameTitle',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'startPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'upAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'downAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'prizeAmount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'category',
            type: 'string'
          },
          {
            internalType: 'bool',
            name: 'isEnded',
            type: 'bool'
          },
          {
            internalType: 'address[]',
            name: 'betUsers',
            type: 'address[]'
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string'
          }
        ],
        internalType: 'struct BetMeme.Game[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      }
    ],
    name: 'getGame',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'gameId',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'gameTitle',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'startPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'upAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'downAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'prizeAmount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'category',
            type: 'string'
          },
          {
            internalType: 'bool',
            name: 'isEnded',
            type: 'bool'
          },
          {
            internalType: 'address[]',
            name: 'betUsers',
            type: 'address[]'
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string'
          }
        ],
        internalType: 'struct BetMeme.Game',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getGameList',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'gameId',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'gameTitle',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'startPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'upAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'downAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'prizeAmount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'category',
            type: 'string'
          },
          {
            internalType: 'bool',
            name: 'isEnded',
            type: 'bool'
          },
          {
            internalType: 'address[]',
            name: 'betUsers',
            type: 'address[]'
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string'
          }
        ],
        internalType: 'struct BetMeme.Game[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      }
    ],
    name: 'getUserBet',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'gameId',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'betUp',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'status',
            type: 'string'
          }
        ],
        internalType: 'struct BetMeme.UserBet',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getUsersBetList',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'gameId',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'betUp',
            type: 'bool'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'status',
            type: 'string'
          }
        ],
        internalType: 'struct BetMeme.UserBet[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'userBets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'gameId',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'betUp',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'status',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

export default WNW_ABI;
