import Vue from 'vue'
import Vuex from 'vuex'

import {
  loadState,
  saveState
} from '../localStorage'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  bip39phrase: '',
  address: ''

}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
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

  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
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
  }
}

// getters are functions
const getters = {
  walletPPExists: state => state.bip39phrase ? true : false

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
