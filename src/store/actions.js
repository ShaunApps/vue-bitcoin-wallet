// actions are functions that cause side effects and can involve
// asynchronous operations.
export default {
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
