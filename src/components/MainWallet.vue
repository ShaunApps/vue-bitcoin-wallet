<template>
    <div id="main">
        <b-navbar class="mainNav" type="dark" variant="info">
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
              <p class="card-text">BTC Balance: {{coins}}</p>
              <p class="card-text">USD Balance: ${{usdBalance}}</p>
              <CreateTransactionModal text-variant="dark" />
            </b-card>
          </div>
        </b-container>
        <!-- <div class="transactions-div">
          <Transactions />
        </div> -->
        
    </div>
</template>

<script>
import { generateNewBip39, generateAddress } from "../logic/index";
import CreateTransactionModal from "./main-wallet-components/CreateTransactionModal";
import Transactions from "./main-wallet-components/Transactions";

export default {
  components: { CreateTransactionModal, Transactions },
  data() {
    return {};
  },
  computed: {
    currentAddress() {
      return this.$store.state.address;
    },
    currentPrice() {
      return this.$store.state.data.price.data;
    },
    coins() {
      return this.$store.state.data.utxos.data.coins || 0;
    },
    usdBalance() {
      return (
        this.$store.state.data.price.data *
          this.$store.state.data.utxos.data.coins || 0
      );
    }
  },
  created: function() {
    let address = this.$store.state.address;
    this.$store.dispatch("fetchUTXOS", address);
    this.$store.dispatch("getPriceUSD");
    // this.$store.dispatch("getTransactions", address);
    // this.$store.dispatch("getFee");
  }
};
</script>
<style>
.mainNav {
  margin: 0px;
}
.wallet-card {
  margin: 15px;
}

.transactions-div {
  padding-bottom: 15px;
}
</style>
