<template>
    <Backdrop class="flex justify-center items-center">
        <div class="bg-white rounded-md shadow-md w-11/12 md:1/2 lg:w-1/4 overflow-y-auto max-h-5/6">
            <div class="flex items-center justify-between mt-4 mb-2 pb-2 px-4 border-b">
                <h1 class="text-xl">
                    <slot name="header"></slot>
                </h1>
                <svg @click="close" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </div>
            
            <div class="px-4 py-1 mb-3">
                <slot name="body"></slot>
            </div>
          
            <div class="mt-2 pt-2 border-t">
                <div class="w-full flex justify-end items-center px-4 pb-4">
                    <slot name="footer" ></slot>
                </div>
            </div>
            
        </div>
    </Backdrop>
</template>

<script>
    import Backdrop from '../BackdropComponent.vue';
    
    export default {
        methods: {
            close() {
                this.$emit('close');
            }
        },

        components: {
            Backdrop,
        }
    }

</script>