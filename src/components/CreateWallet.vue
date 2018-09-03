<template>
    <div id="bip39">
        <h1>
            Create new wallet
        </h1>
        <p>Create new bip39 wallet 12-word phrase</p>
        <p> {{phrase}}</p>
        
    </div>
</template>


<script>
import { generateNewBip39 } from "../logic/index";
export default {
  name: "bip39",
  data() {
    return {
      phrase: generateNewBip39()
    };
  }
};
</script>
