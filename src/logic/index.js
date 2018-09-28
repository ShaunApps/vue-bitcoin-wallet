import bitcoin from 'bitcoinjs-lib'
import bip39 from 'bip39'
import bip32 from 'bip32'



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
  const address = getAddress(derived);
  return address;
}



function getAddress(node, network) {
  return bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network
  }).address
}
