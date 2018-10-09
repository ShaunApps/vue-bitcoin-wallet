import {
  exchange,
  blockexplorer,
  pushtx
} from 'blockchain.info';
import bitcoin from 'bitcoinjs-lib'
import Constants from './constants'

const env = require('../env.json');


let c_blockexplorer;
let c_pushtx;
let c_network;

switch (env.network) {
  case Constants.Networks.Testnet:
    c_blockexplorer = blockexplorer.usingNetwork(3);
    c_pushtx = pushtx.usingNetwork(3).pushtx;
    c_network = bitcoin.networks.testnet;
    break;
  case Constants.Networks.Bitcoin:
    c_blockexplorer = blockexplorer;
    c_pushtx = pushtx.pushtx;
    c_network = bitcoin.networks.bitcoin;
    break;
  default:
    throw new Error('Unknown network in env file');
}


const getFee = () => {
  const fee = fetch(Constants.Endpoints.BitcoinFees).then(response => response)
    .then(response => (response.fastestFee * Constants.Transactions.AverageBytes) / Constants.Bitcoin.Satoshis);
  console.log('response: ' + fee);
  return fee
};

const broadcast = tx => c_pushtx(tx).then(result => result === Constants.ReturnValues.TransactionSubmitted);



const getUTXOS = (address) => {
  return c_blockexplorer.getUnspentOutputs(address).then((result) => {
    return {
      utxos: result.unspent_outputs,
      coins: result.unspent_outputs.reduce((a, c) => a + c.value, 0) / Constants.Bitcoin.Satoshis
    };
  });
};

// const getTransactions = ({
//   address
// }) => {
//   return c_blockexplorer.getAddress(address, {}).then((result) => {
//     return Array.isArray(result.txs) ? result.txs : [];
//   });
// };

const getTransactions = ({
  address
}) => {
  return c_blockexplorer.getAddress(address, {}).then((result) => {
    return result.txs;
  });
};

const getPrice = () => {
  const URL = `https://blockchain.info/ticker`
  const price = fetch(URL).then(response => response.json());
  return price
}

export default {
  current: c_network,
  name: env.network,
  api: {
    getPrice: getPrice,
    getFee: getFee,
    broadcast: broadcast,
    getUTXOS: getUTXOS,
    getTransactions: getTransactions,
  }
};
