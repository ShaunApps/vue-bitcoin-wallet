import bitcoin from 'bitcoinjs-lib'
import bip39 from 'bip39'
import bip32 from 'bip32'
import Constants from './constants'
import bnet from './network'



// generate mnemonic wrapper
export const generateNewBip39 = () => {
  let newMnemonic = bip39.generateMnemonic();
  return newMnemonic;
}

export const generateAddress = (mnemonic) => {
  const seed = bip39.mnemonicToSeed(mnemonic);
  const root = bip32.fromSeed(seed);

  const derived = root.derivePath("m/0'/0/0");
  const testnet = bitcoin.networks.testnet;
  const address = getAddress(derived, testnet);
  return address;
}



export const getAddress = (node, network) => {
  return bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
  }).address
}



// const toSatoshis = (btc) => {
//   Math.round(btc * Constants.Bitcoin.Satoshis)
// }


export const send = ({
  btc,
  address,
  fee,
  utxos
}) => {

  const satoshis = Math.round(btc * Constants.Bitcoin.Satoshis);

  const network = bitcoin.networks.testnet;

  const txb = new bitcoin.TransactionBuilder(network);

  let current = 0;
  for (const utx of utxos) {

    txb.addInput(utx.tx_hash_big_endian, utx.tx_output_n);

    current += utx.value;
    if (current >= (satoshis + fee)) break;
  }

  txb.addOutput(address, satoshis);

  const changeAddress = localStorage.address;
  const change = current - (satoshis + fee);
  if (change) txb.addOutput(changeAddress, change);


  const seed = bip39.mnemonicToSeed(localStorage.bip39phrase);
  const root = bip32.fromSeed(seed, network);
  const child = root.derivePath("m/0'/0/0");

  // const wif = bip32.fromSeed(seed, network).toWIF();
  // const key = bitcoin.ECPair.fromWIF(wif, network);

  txb.sign(0, child);

  const raw = txb.build().toHex();
  console.log(raw);

  return bnet.api.broadcast(raw);
}
