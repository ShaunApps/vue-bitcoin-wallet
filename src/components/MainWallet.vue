<template>
    <div id="main">
        <b-navbar toggleable="md" type="dark" variant="info">


        <b-navbar-brand href="#">Vue.js Bitcoin Wallet</b-navbar-brand>
        

  
        </b-navbar>
    </div>
</template>

<script>
import { generateNewBip39, generateAddress } from "../logic/index";
export default {
  data() {
    return {
      computed: {
        utxosListed() {
          return this.$store.getters.fetchingUTXOS;
        }
      }
    };
  },
  created: function() {
    let address = this.$store.getters.getAddress;
    this.$store.dispatch("fetchUTXOS", address);
  }
};
</script>
