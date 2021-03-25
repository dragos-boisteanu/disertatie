<template>
    <Backdrop>
        <div class="relative h-full w-3/4 shadow-md bg-coolGray-100 md:w-2/4 lg:w-1/4 xl:1/5">
            <div class="absolute top-2 right-2 z-10 cursor-pointer">
                <slot name="close"></slot>
            </div>
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
        },
    }
</script>