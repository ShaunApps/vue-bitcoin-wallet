<template>
<div>
    <b-btn v-b-modal.createmodal href="#" variant="primary">Create Transaction</b-btn>
    <!-- Modal Component -->
    <b-modal id="createmodal" title="Bootstrap-Vue">
        <b-form >
            <b-form-input 
                    placeholder="Enter destination address"></b-form-input>
            <b-form-input 
                    placeholder="Transaction Fee"></b-form-input>
        </b-form>
    </b-modal>
</div>
</template>
<script>
export default {};
</script>
