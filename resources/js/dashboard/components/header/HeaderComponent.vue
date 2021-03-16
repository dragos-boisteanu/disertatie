<template>
    <div class="flex justify-between items-center px-3 py-2">
        <div class="h-12 w-12">
            <img src="storage/app/public/logo/logo.png" class="w-full h-full"/>
        </div>
        <div  @click="toggleSliderState" class="p-2 cursor-pointer lg:hidden">
            <div class="h-0.5 w-5 bg-black"></div>
            <div class="h-0.5  w-5 mt-1 bg-black"></div>
            <div class="h-0.5  w-5 mt-1 bg-black"></div>
        </div>
        <Slider v-show="showSliderState" @close="toggleSliderState"/>
    </div>
</template>


<script>
    import BackdropComponent from '../BackdropComponent';
    import Slider from '../slider/SliderComponent';

    export default {
        data() {
            return {
                showSliderState: false,
            }
        },

        methods: {
            toggleSliderState() {
                this.showSliderState = !this.showSliderState;
            }
        },

        components: {
            BackdropComponent,
            Slider,
        }
    }
</script>