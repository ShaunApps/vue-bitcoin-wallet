import Vue from 'vue'
import Vuex from 'vuex'
import Wallet from '../logic/wallet.class'

import {
  loadState,
  saveState
} from '../localStorage'
import bnet from '../logic/network'
import {
  send
} from '../logic/index'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  bip39phrase: '',
  address: '',
  wallet: {},
  data: {
    utxos: {
      fetching: false,
      data: []
    },
    price: {
      fetching: false,
      data: ""
    },
    fee: {
      fetching: false,
      data: 10000
    },
    transactions: {
      fetching: false,
      data: []
    }
  },
  utxos: []

}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {

  /* 
    ******************
    PASSPHRASE MUTATIONS
    ******************
  */

  loadPassPhrase(state, passphrase) {
    state.bip39phrase = passphrase
  },

  loadAddress(state, address) {
    state.address = address
  },

  savePassPhrase(state, passphrase) {
    // save phrase in state
    state.bip39phrase = passphrase;
    // might not be best place to put this
    // saves phrase to local storage
    saveState(state, 'bip39phrase', state.bip39phrase);
  },

  saveAddress(state, address) {
    state.address = address;
    saveState(state, 'address', state.address)

  },

  /* 
    ******************
    UTXOS & PRICE MUTATIONS
    ******************
  */

  fetchingUTXOS(state) {
    state.data.utxos.fetching = !(state.data.utxos.fetching)
  },

  retrievedUTXOS(state, utxoData) {
    state.data.utxos.data = utxoData
    state.utxos = utxoData.utxos
  },

  fetchingPrice(state) {
    state.data.price.fetching = !(state.data.price.fetching)
  },

  retrievedPrice(state, price) {
    state.data.price.data = price
  },

  fetchingFee(state) {
    state.data.fee.fetching = !(state.data.fee.fetching)
  },

  retrievedFee(state, fee) {
    state.data.fee.data = fee
  },

  /* 
    ******************
    TRANSACTION MUTATIONS
    ******************
  */

  sendingTransaction(state) {
    state.data.transactions.fetching = !(state.data.transactions.fetching)
  },

  sentTransaction(state) {

  },

  transactionError(state) {

  },

  gettingTransactions(state) {
    state.data.transactions.fetching = !(state.data.transactions.fetching)
  },

  gotTransactions(state, transactions) {
    state.data.transactions.data = transactions
  },

  getTransactionsError(state, err) {

  }



}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  /* 
    ******************
    PASSPHRASE ACTIONS
    ******************
  */
  loadPassPhrase: ({
    commit
  }, passphrase) => {
    commit('loadPassPhrase', passphrase)
  },
  savePassPhrase: ({
    commit
  }, passphrase) => {
    commit('savePassPhrase', passphrase)
  },
  loadAddress: ({
    commit
  }, address) => {
    commit('loadAddress', address)
  },
  saveAddress: ({
    commit
  }, address) => {
    commit('saveAddress', address)
  },

  /* 
    ******************
    UTXOS & PRICE ACTIONS
    ******************
  */
  async fetchUTXOS({
    commit
  }, address) {
    commit('fetchingUTXOS')
    try {
      let utxoData = await bnet.api.getUTXOS(address)
      commit('fetchingUTXOS')
      commit('retrievedUTXOS', utxoData)
    } catch (err) {
      console.log(err)
      let utxoData = []
      commit('fetchingUTXOS')
      commit('retrievedUTXOS', utxoData)
    }
  },

  async getPriceUSD({
    commit
  }) {
    commit('fetchingPrice')
    try {
      let response = await bnet.api.getPrice()
      let price = response["USD"]["last"]
      commit('fetchingPrice')
      commit('retrievedPrice', price)

    } catch (err) {
      console.log(err)
    }
  },

  async getFee({
    commit
  }) {
    commit('fetchingFee')
    try {
      let response = await bnet.api.getFee()
      commit('fetchingFee')
      commit('retrievedFee', response)
    } catch (err) {
      console.log(err)
    }
  },

  /* 
    ******************
    TRANSACTION ACTIONS
    ******************
  */

  async createSend({
    commit
  }, payload) {
    commit('sendingTransaction')
    try {
      await send(payload)
      commit('sentTransaction')
    } catch (err) {
      commit('transactionError', err)
      console.log(err)
    }



  },

  async getTransactions({
    commit
  }, payload) {
    commit("gettingTransactions")
    try {
      const transactions = await bnet.api.getTransactions(payload)
      commit('gotTransactions', transactions)
    } catch (err) {
      commit('getTransactionsError', err)
      console.log(err)
    }
  },

  /* 
    ******************
    BUILD WALLET ACTIONS
    ******************
  */

  async buildWallet({
    commit
  }, phrase) {
    const wallet = Wallet.create(phrase)
    commit('buildWallet', wallet)
    await wallet.update()
    commit('updateWallet', wallet)

  },

}

// getters are functions
const getters = {
  walletPPExists: state => state.bip39phrase ? true : false,
  fetchingUTXOS: state => state.data.utxos.fetching ? true : false,
  getUTX0S: state => state.utxos,
  getPhrase: state => state.bip39phrase,
  getWallet: state => state.wallet,
  walletExists: state => state.wallet ? true : false,
  getCurrentAddress: state => state.wallet.address,
  getAddress: state => state.address,
  getPrice: state => state.data.price.data
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: true
})
