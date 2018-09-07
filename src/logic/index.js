import bitcoin from 'bitcoinjs-lib'
import bip39 from 'bip39'
import bip32 from 'bip32'




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

// const testnet = bitcoin.networks.testnet;

// const shaun = bitcoin.ECPair.fromWIF(
//   "cMahea7zqjxrtgAbB7LSGbcQUr1uX1ojucnWHCLQY4bCxDUg17Vn",
//   testnet
// );
// const shaunpkh = bitcoin.payments.p2pkh({
//   pubkey: shaun.publicKey,
//   network: testnet
// });

// // .059
// let change_amnt = 0.0589 * 100000000;
// let output_amnt = 0.029 * 100000000;

// const txb = new bitcoin.TransactionBuilder(testnet);

// txb.addInput(
//   "907b723e1d538fc3eccf8cd34a24865b2789db11f4e42585be417865739e4b21",
//   1
// );
// txb.addOutput(shaunpkh.address, change_amnt);
// // txb.addOutput(shaunpkh.address, output_amnt);
// // txb.addOutput("n4S9CqRuarHiij7dQswqTNJibu51LonYSt", output_amnt);

// // OP_RETURN stuff
// const data = Buffer.from("testing my message", "utf8");
// const embed = bitcoin.payments.embed({
//   data: [data]
// });

// txb.addOutput(embed.output, 1000);

// txb.sign(0, shaun);
// console.log(txb.build().toHex());
