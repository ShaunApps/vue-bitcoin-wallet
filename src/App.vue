<template>
  <div id="app">
    <template v-if="bip39phrase">
      <MainWallet/>
    </template>
    <template v-else>
      <EnterWallet/>
    </template>
  </div>
</template>

<script>
import MainWallet from "./components/MainWallet";
import EnterWallet from "./components/EnterWallet";
import { loadState } from "./localStorage";

export default {
  name: "App",
  components: { MainWallet, EnterWallet },
  computed: {
    bip39phrase() {
      return this.$store.getters.walletPPExists;
    },
    existingWallet() {
      return this.$store.getters.walletExists;
    }
  },
  mounted() {
    // let passphrase = loadState();
    // loadState() not working, below seems to work
    this.$store.dispatch("loadPassPhrase", localStorage.bip39phrase);
    this.$store.dispatch("loadAddress", localStorage.address);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
