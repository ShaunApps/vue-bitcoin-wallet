import {
  loadState,
  saveState
} from '../localStorage'

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
export default {
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
