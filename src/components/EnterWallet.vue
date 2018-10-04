<template>
    <div>
      <b-container>
            <div class="wallet-container">
              <div class="welcome-contents">
                <h1>
                  Welcome to my Bitcoin Wallet
                </h1>
              </div>
              <!-- modal for passphrase creation -->
              <div class="modal-button-wrapper">
                <b-btn v-b-modal.modal1 variant="primary">Create New Wallet</b-btn>
                <b-modal 
                  id="modal1" 
                  title="Get your passphrase"
                  @ok="handleOk" 
                  no-close-on-esc no-close-on-backdrop>
                  <p>We have created a passphrase for you in the box below.
                  This passphrase lets you access your wallet and the funds it contains.</p>
                  <textarea v-model="generatedPhrase" v-bind:placeholder="generatedPhrase"></textarea>
                </b-modal>
              </div>
              <!-- log in for passphrase -->
              <div class="login-form-wrapper">
                <b-card  bg-variant="dark" text-variant="white" title="Log in to your wallet">
                  <b-form @submit="onSubmit">
                    <b-form-input v-model="enteredPhrase"
                            type="password"
                            :state="bip39State"
                            placeholder="Enter your 12-word passphrase"></b-form-input>
                    <b-input-group-append>
                    <b-button type="submit" variant="primary">Open Wallet</b-button>
                    </b-input-group-append>
                  </b-form>
                </b-card>
                
              </div>
            </div>
      </b-container>
    </div>
</template>


<script>
import { generateNewBip39, generateAddress } from "../logic/index";
import bip39 from "bip39";

export default {
  data() {
    return {
      generatedPhrase: generateNewBip39(),
      enteredPhrase: ""
    };
  },
  computed: {
    bip39State() {
      return bip39.validateMnemonic(this.enteredPhrase);
    }
  },
  methods: {
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      this.save();
    },
    // below needs refractoring
    save: function() {
      let address = generateAddress(this.generatedPhrase);
      this.$store.dispatch("savePassPhrase", this.generatedPhrase);
      this.$store.dispatch("saveAddress", address);
      this.$refs.modal.hide();
    },
    onSubmit(e) {
      e.preventDefault();
      if (bip39.validateMnemonic(this.enteredPhrase)) {
        let address = generateAddress(this.enteredPhrase);
        this.$store.dispatch("savePassPhrase", this.enteredPhrase);
        this.$store.dispatch("saveAddress", address);
      }
    }
  }
};
</script>

<style>
textarea {
  width: 300px;
  height: 85px;
}

.wallet-container {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
}

.welcome-contents {
  margin: 25px;
}

.modal-button-wrapper {
  margin: 25px;
}

.login-form-wrapper {
  margin: 25px;
}
</style>
