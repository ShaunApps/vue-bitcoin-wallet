<template>
    <div id="main">
        <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="#">Vue.js Bitcoin Wallet</b-navbar-brand>
        </b-navbar>
        <b-container>
          <div class="wallet-card">
            <b-card header="Wallet Data"
                    bg-variant="dark" 
                    text-variant="white"
                    align="left"
                    style="max-width: 60rem;"
                    class="mb-2">
              <p class="card-text">Current address: </p>
              <p class="card-text">1.2 BTC</p>
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
    return {
      computed: {
        utxosListed() {
          return this.$store.getters.fetchingUTXOS;
        },
        currentAddress() {
          let address = this.$store.getters.getCurrentAddress;
          return address;
        }
      }
    };
  },
  created: function() {
    let mnemonic = this.$store.getters.getPhrase;
    // this.$store.dispatch("fetchUTXOS", address);
    this.$store.dispatch("buildWallet", mnemonic);
    // dispatch build wallet
  }
};
</script>
<style>
.wallet-card {
  margin: 15px;
}
</style>
