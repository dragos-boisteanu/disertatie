<template>
    <Backdrop class="flex justify-center items-center">
        <div class="bg-white rounded-md shadow-md w-11/12 md:w-auto overflow-y-auto max-h-5/6">
            <div class="text-3xl mt-4 mb-2 pb-2 border-b">
                <h1 class="px-4">
                    <slot name="header"></slot>
                </h1>
            </div>
            
            <div class="px-4 ">
                <slot></slot>
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
    import Backdrop from './BackdropComponent.vue';
    
    export default {
        components: {
            Backdrop,
        }
    }

</script>