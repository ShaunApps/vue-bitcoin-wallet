<template>
    <div>
        <h1>
            Welcome to my Bitcoin Wallet
        </h1>
        <b-btn v-b-modal.modal1>Launch demo modal</b-btn>
          <b-modal id="modal1" title="Bootstrap-Vue">
          <h1>
              Create new wallet
          </h1>
          <p>Create new bip39 wallet 12-word phrase</p>
          <textarea v-model="phrase" v-bind:placeholder="phrase"></textarea>
       </b-modal>


        <button id="show-modal" @click="showModal = true">Create new wallet</button>
        <!-- use the modal component, pass in the prop -->
        <modal v-if="showModal" @close="showModal = false">
        </modal>
          <p>Enter exisitng 12-word phrase</p>


          <b-form-input v-model="text1"
                  type="text"
                  placeholder="Enter your name"></b-form-input>

    </div>

</template>


<script>
import CreateWallet from "./CreateWallet";
import { generateNewBip39 } from "../logic/index";
export default {
  components: { modal: CreateWallet },
  data() {
    return {
      showModal: false
    };
  }
};
</script>
