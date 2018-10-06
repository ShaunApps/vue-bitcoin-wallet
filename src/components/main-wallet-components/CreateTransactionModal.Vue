<template>
<div>
    <b-btn v-b-modal.createmodal href="#" variant="primary">Create Transaction</b-btn>
    <!-- Modal Component -->
    <b-modal id="createmodal" title="Bootstrap-Vue">
        <p class="my-4">Hello from modal!</p>
    </b-modal>
</div>
</template>
<script>
export default {};
</script>
