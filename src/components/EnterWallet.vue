<template>
    <div>
      <b-container>
        <b-row class="text-center">
          <b-col></b-col>
          <b-col cols="8">
            <div class="wallet-container">
              <h1>
                  Welcome to my Bitcoin Wallet
              </h1>
              <div>
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
              <b-card  bg-variant="dark" text-variant="white" title="Log in to your wallet">
              <b-form-input v-model="enteredPhrase"
                        type="text"
                        placeholder="Enter your 12-word passphrase"></b-form-input>
              </b-card>
            </div>
         </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </div>

</template>


<script>
import { generateNewBip39, generateAddress } from "../logic/index";
export default {
  data() {
    return {
      generatedPhrase: generateNewBip39(),
      enteredPhrase: ""
    };
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
      let address = generateAddress(this.phrase);
      this.$store.dispatch("savePassPhrase", this.enteredPhrase);
      this.$store.dispatch("saveAddress", address);
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
</style>
