import bitcoin from 'bitcoinjs-lib'
import bip39 from 'bip39'
import bip32 from 'bip32'
import Constants from './constants'
import network from './network'



// generate mnemonic wrapper
export const generateNewBip39 = () => {
  let newMnemonic = bip39.generateMnemonic();
  return newMnemonic;
}

export const generateAddress = (mnemonic) => {
  console.log('mneomic: ' + mnemonic);
  const seed = bip39.mnemonicToSeed(mnemonic);
  const root = bip32.fromSeed(seed);

  const derived = root.derivePath("m/0'/0/0");
  const testnet = bitcoin.networks.testnet;
  const address = getAddress(derived, testnet);
  return address;
}



function getAddress(node, network) {
  return bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
  }).address
}



// 
const send = (btc, address, changeAddress, fee, password, utxos, wif) => {

  const satoshis = Math.round(btc * Constants.Bitcoin.Satoshis);

  const network = network.current;

  const txb = new bitcoin.TransactionBuilder(network);

  let current = 0;
  for (const utx of utxos) {

    txb.addInput(utx.tx_hash_big_endian, utx.tx_output_n);

    current += utx.value;
    if (current >= (satoshis + fee)) break;
  }

  txb.addOutput(address, satoshis);

  const change = current - (satoshis + fee);
  if (change) txb.addOutput(this.address, change);


  // const wif = this.__password ? this.readDecrypted(password) : this.wif;
  const key = bitcoin.ECPair.fromWIF(wif, network);

  txb.sign(0, key);

  const raw = txb.build().toHex();

  return network.api.broadcast(raw);
}
