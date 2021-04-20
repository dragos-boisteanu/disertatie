<template>
    <Backdrop class="flex justify-center items-center">
        <div class="bg-white p-4 rounded-md shadow-md w-11/12 md:w-auto overflow-y-auto max-h-5/6">
            <slot></slot>
        </div>
    </Backdrop>
</template>

<script>
    import Backdrop from './BackdropComponent.vue';
    
    export default {
        components: {
            Backdrop,
        }
    }

</script>