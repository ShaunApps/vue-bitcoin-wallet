<template>
    <div>
        <h1>
            Enter Existing Wallet
        </h1>
        <p>Enter exisitng 12-word phrase</p>
          
        <form
  id="existing"
 
>
  <!-- <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p> -->

  <p>
    
    <input
      id="12word"
      v-model="name"
      type="text"
      name="12word"
      value="Enter your 12 word passphrase"
    >
  </p>
  
  
    <input
      type="submit"
      value="Submit"
    >

</form>
    </div>
</template>


<script>
import CreateWallet from "./CreateWallet";
import { generateNewBip39 } from "../logic/index";
export default {};
</script>
