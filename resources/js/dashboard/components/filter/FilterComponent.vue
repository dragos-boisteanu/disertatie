<template>
    <Backdrop>
        <div class="h-full w-3/4 shadow-md bg-coolGray-100">
            <div class="w-full py-5 px-5 text-center text-xl border-b border-gray-400">
                <slot name="header"></slot>
            </div>
           
            <slot></slot>
        </div>
       
    </Backdrop>
</template>

<script>
    import Backdrop from '../BackdropComponent';

    export default {
        components: {
            Backdrop
        }
    }
</script>