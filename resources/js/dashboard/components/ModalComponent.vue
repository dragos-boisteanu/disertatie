<template>
    <Backdrop class="flex justify-center items-center">
        <div class="bg-white p-4 rounded-md w-11/12 shadow-md overflow-y-auto max-h-5/6">
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