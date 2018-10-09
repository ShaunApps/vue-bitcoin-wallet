<template>
<div>
    <b-btn v-b-modal.createmodal href="#" variant="primary">Create Transaction</b-btn>
    <!-- Modal Component -->
    <b-modal @ok="onSubmit" ref="transactionModal" id="createmodal" title="Create Transaction" header-text-variant="dark" body-text-variant="dark">
        <b-form>
            <b-form-group id="destinationAddressGroup"
                    label="Destination Address:"
                    label-for="destinationAddress">
                <b-form-input id="destinationAddress"
                            type="text"
                            v-model="address"
                            :state="validAddress"
                            required
                            placeholder="Enter address">
                </b-form-input>
            </b-form-group>
            <b-form-group id="destinationAmountGroup"
                    label="Amount:"
                    label-for="destinationAmount">
                <b-form-input id="destinationAmount"
                            type="text"
                            v-model="amount"
                            required
                            placeholder="Enter amount to send">
                </b-form-input>
            </b-form-group>
            <b-form-group id="feeGroup"
                    label="Fee: (in satoshis)"
                    label-for="fee">
                <b-form-input id="fee"
                            type="text"
                            v-model="fee"
                            required
                            placeholder="Enter fee">
                </b-form-input>
            </b-form-group>
        </b-form>
    </b-modal>
</div>
</template>
<script>
import bs58check from "bs58check";

export default {
  data() {
    return {
      address: "",
      amount: "",
      fee: this.$store.state.data.fee.data
    };
  },
  computed: {
    // fee() {
    //   return this.$store.state.data.fee.data;
    // },
    validAddress() {
      //   return bs58check.decode(this.address) ? true : false;
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const btc = this.amount;
      const { address, fee } = this;
      const utxos = this.$store.getters.getUTX0S;
      this.$store.dispatch("createSend", { btc, address, fee, utxos });
      this.$refs.transactionModal.hide();
    }
  }
};
</script>
