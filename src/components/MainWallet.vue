<template>
    <div id="main">
        <b-navbar toggleable="md" type="dark" variant="info">
          <b-navbar-brand href="#">Vue.js Bitcoin Wallet</b-navbar-brand>
          <b-navbar-nav right>
            <b-nav-item right>BTC-USD: ${{currentPrice}}</b-nav-item>
  
          </b-navbar-nav>
        </b-navbar>
        <b-container>
          <div class="wallet-card">
            <b-card header="Wallet Data"
                    bg-variant="dark" 
                    text-variant="white"
                    align="left"
                    style="max-width: 60rem;"
                    class="mb-2">
              <p class="card-text">Current address: {{currentAddress}}</p>
              <CreateTransactionModal />
            </b-card>
          </div>
        </b-container>
        <b-table striped hover></b-table>
    </div>
</template>

<script>
import { generateNewBip39, generateAddress } from "../logic/index";
import CreateTransactionModal from "./main-wallet-components/CreateTransactionModal";

export default {
  components: { CreateTransactionModal },
  data() {
    return {};
  },
  computed: {
    currentAddress() {
      return this.$store.state.address;
    },
    currentPrice() {
      return this.$store.state.data.price.data;
    }
  },
  created: function() {
    // let mnemonic = this.$store.getters.getPhrase;
    let address = this.$store.state.address;
    this.$store.dispatch("fetchUTXOS", address);
    this.$store.dispatch("getPriceUSD");
    // this.$store.dispatch("buildWallet", mnemonic);
    // dispatch build wallet
  }
};
</script>
<style>
.wallet-card {
  margin: 15px;
}
</style>
