<template>
  <div id="app">
    <template v-if="bip39PP">
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
export default {
  name: "App",
  components: { MainWallet, EnterWallet },
  computed: {
    bip39PP() {
      return this.$store.getters.walletPPExists;
    }
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
