import Vue from 'vue'
import Vuex from 'vuex'
import {
  loadState
} from '../localStorage'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  bip39phrase: '',
  encryptedRoot: '',
  address: ''

}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  loadPassPhase(state, passphrase) {
    state.bip39phrase = passphrase
  },

  loadState(state) {

  },
  saveRoot(state, root) {
    state.encryptedRoot = root;
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  loadPassPhase: ({
    commit
  }) => {
    let passphrase = loadState();
    commit('loadPassPhrase', passphrase)
  },
  saveRoot: ({
    commit
  }) => commit('saveRoot')
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
