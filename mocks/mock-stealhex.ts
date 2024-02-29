

export const currency = {
    data:[
        {
            "symbol": "xlm",
            "network": "xlm",
            "has_extra_id": true,
            "extra_id": "MEMO",
            "name": "Stellar",
            "warnings_from": [],
            "warnings_to": [],
            "validation_address": "^G[A-D]{1}[A-Z2-7]{54}$",
            "validation_extra": "^[0-9A-Za-z]{1,28}$",
            "address_explorer": "https://stellarchain.io/address/{}",
            "tx_explorer": "https://stellarchain.io/tx/{}",
            "image": "https://icons.stealthex.io/coins-color/625604cd422d1c0017b75411-xlm.svg"
        },
        {
            "symbol": "kmd",
            "network": "MAINNET",
            "has_extra_id": false,
            "extra_id": "",
            "name": "Komodo",
            "warnings_from": [],
            "warnings_to": [],
            "validation_address": "^(R)[A-Za-z0-9]{33}$",
            "validation_extra": null,
            "address_explorer": "https://kmdexplorer.io/address/{}",
            "tx_explorer": "https://kmdexplorer.io/tx/{}",
            "image": "https://icons.stealthex.io/coins-color/6299e62bde5ae50018e77853-kmd_c.svg"
        },
        {
            "symbol": "dcr",
            "network": "MAINNET",
            "has_extra_id": false,
            "extra_id": "",
            "name": "Decred",
            "warnings_from": [],
            "warnings_to": [],
            "validation_address": "^(Ds|Dc)[0-9A-Za-z]{33}$",
            "validation_extra": null,
            "address_explorer": "https://mainnet.decred.org/address/{}",
            "tx_explorer": "https://mainnet.decred.org/tx/{}",
            "image": "https://icons.stealthex.io/coins-color/626ce5b8de5ae50018e72ec3-dcr_c.svg"
        },
        {
            "symbol": "ast",
            "network": "ETH",
            "has_extra_id": false,
            "extra_id": "",
            "name": "AirSwap",
            "warnings_from": [
                "Only AST ERC-20 tokens are available for the deposit"
            ],
            "warnings_to": [
                "Only AST ERC-20 tokens are available for the withdrawal"
            ],
            "validation_address": "^(0x)[0-9A-Fa-f]{40}$",
            "validation_extra": null,
            "address_explorer": "https://etherscan.io/address/{}",
            "tx_explorer": "https://etherscan.io/tx/{}",
            "image": "https://icons.stealthex.io/coins-color/6259ed45422d1c0017b762b2-ast_c.svg"
        },
        {
            "symbol": "dash",
            "network": "MAINNET",
            "has_extra_id": false,
            "extra_id": "",
            "name": "Dash",
            "warnings_from": [],
            "warnings_to": [],
            "validation_address": "^[X|7][0-9A-Za-z]{33}$",
            "validation_extra": null,
            "address_explorer": "https://blockchair.com/dash/address/{}",
            "tx_explorer": "https://blockchair.com/dash/transaction/{}",
            "image": "https://icons.stealthex.io/coins-color/626cdb61de5ae50018e72e46-dash_c.svg"
        },
        {
            "symbol": "dgb",
            "network": "dgb",
            "has_extra_id": false,
            "extra_id": "",
            "name": "DigiByte",
            "warnings_from": [],
            "warnings_to": [],
            "validation_address": "^[D][a-km-zA-HJ-NP-Z1-9]{30,50}$|^(S)[0-9A-Za-z]{30,50}$|^(dgb)[0-9A-Za-z]{30,50}$",
            "validation_extra": null,
            "address_explorer": "https://digiexplorer.info/address/{}",
            "tx_explorer": "https://digiexplorer.info/tx/{}",
            "image": "https://icons.stealthex.io/coins-color/626ced8ade5ae50018e72f12-dgb_c.svg"
        },
        {
            "symbol": "rep",
            "network": "ETH",
            "has_extra_id": false,
            "extra_id": "",
            "name": "Augur",
            "warnings_from": [
                "Only REP ERC-20 tokens are available for the deposit"
            ],
            "warnings_to": [
                "Only REP ERC-20 tokens are available for the withdrawal"
            ],
            "validation_address": "^(0x)[0-9A-Fa-f]{40}$",
            "validation_extra": null,
            "address_explorer": "https://etherscan.io/address/{}",
            "tx_explorer": "https://etherscan.io/tx/{}",
            "image": "https://icons.stealthex.io/coins-color/625d38ab422d1c0017b765da-rep_c.svg"
        }],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
}

export const NativeCurrency = {
    data :  [
        "usdcalgo",
        "scrt",
        "chzerc20",
        "mavzk",
        "bifierc20",
        "mavbase",
        "prombsc",
        "ntrn",
        "rdnterc20",
        "compbsc",
        "chzmainnet",
        "aeurerc20",
        "alicebsc",
        "aeurbsc",
        "ace",
        "usdcnear",
        "vic",
        "fdusdopbnb",
        "beamxerc20",
        "enjmainnet",
        "beamxbsc",
      ],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
}

export const Swap = {
  data: {
    "id": '145dfnd',
    "type": "floating",
    "timestamp": "2020-11-24T18:11:34.325Z",
    "updated_at": "2020-11-26T18:11:32.683Z",
    "currency_from": "btc",
    "currency_to": "eth",
    "amount_from": "0.1",
    "expected_amount": "0.1",
    "amount_to": "3.13986679",
    "address_from": "1DpwmiCkmpwXzk4ofFk5Qg9AjqsPiEMbxH",
    "address_to": "0x6B6005c8e59bfEcF565c7B5f6097b12AA6e35806",
    "extra_id_from": "",
    "extra_id_to": "",
    "tx_from": "",
    "tx_to": "",
    "status": "waiting",
    "refund_address": "19qkGjPowymJ49VKqomQzo4vH7j99KzmSx",
    "refund_extra_id": "",
    "currencies": {
    "btc": {
        "symbol": "btc",
        "has_extra_id": false,
        "extra_id": "",
        "name": "Bitcoin",
        "warnings_from": [],
        "warnings_to": [],
        "validation_address": "^[13][a-km-zA-HJ-NP-Z1-9]{25,80}$|^(bc1)[0-9A-Za-z]{25,80}$",
        "validation_extra": null,
        "address_explorer": "https://blockchair.com/bitcoin/address/{}",
        "tx_explorer": "https://blockchair.com/bitcoin/transaction/{}",
        "image": "https://api.stealthex.io/icons/ZWZYZEGM9pBjGP8U.svg"
    },
              "eth": {
                "symbol": "eth",
                "has_extra_id": false,
                "extra_id": "",
                "name": "Ethereum",
                "warnings_from": [
                  "Do not deposit your ETH from a smart contract"
                ],
                "warnings_to": [
                  "Do not provide a smart contract as your ETH payout address"
                ],
                "validation_address": "^(0x)[0-9A-Fa-f]{40}$",
                "validation_extra": null,
                "address_explorer": "https://blockchair.com/ethereum/address/{}",
                "tx_explorer": "https://blockchair.com/ethereum/transaction/{}",
                "image": "https://api.stealthex.io/icons/bMilTv7MKMZTzxUZ.svg"
              }
            }
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
}
export const mockSwap = {
    id: '145dfnd',
    currencyFrom:'btc',
    currencyTo: 'eth',
    iconFrom: 'https://api.stealthex.io/icons/ZWZYZEGM9pBjGP8U.svg',
    iconTo: 'https://api.stealthex.io/icons/bMilTv7MKMZTzxUZ.svg',
    amountFrom: '0.1',
    amountTo: '3.13986679',
    addressFrom: '1DpwmiCkmpwXzk4ofFk5Qg9AjqsPiEMbxH',
    addressTo: '0x6B6005c8e59bfEcF565c7B5f6097b12AA6e35806',
    status: 'waiting'
}


export const responseSwap = { destination: '1DpwmiCkmpwXzk4ofFk5Qg9AjqsPiEMbxH', id: '145dfnd' }

export const responseEstimate = {
    data: { "estimated_amount": "2.5054064" },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
}

export const responseMin = {
    data: { "min_amount": "0.00082449" },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
}

export const estimate = {
  estimated: '2.5054064',
  min: '0.00082449',
}

