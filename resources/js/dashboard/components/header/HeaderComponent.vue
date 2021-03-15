<template>
    <div class="flex justify-between items-center px-3 py-2">
     <div class="h-12 w-12">
            <img src="storage/app/public/logo/logo.png" class="w-full h-full"/>
        </div>
        <div  @click="toggleSliderState" class="p-2 cursor-pointer">
            <div class="h-0.5 w-5 bg-black"></div>
            <div class="h-0.5  w-5 mt-1 bg-black"></div>
            <div class="h-0.5  w-5 mt-1 bg-black"></div>
        </div>
        <BackdropComponent v-show="showSliderState" @click.native="toggleSliderState">
            <div class="absolute left-0 top-0 w-3/4 h-full bg-gray-900" >
                <div class="logo-container">
                    <img alt="site-logo"/>
                </div>
                <div class="user-menu">
                    user dropdown
                </div> 
                <ul class="navigation-link">
                    <SliderNavigationComponent name="Dashboard" @click="toggleSliderState"></SliderNavigationComponent>
                    <SliderNavigationComponent name="Users" @click="toggleSliderState"></SliderNavigationComponent>
                    <SliderNavigationComponent name="Orders"></SliderNavigationComponent>
                    <SliderNavigationComponent name="Products"></SliderNavigationComponent>
                    <SliderNavigationComponent name="Stocks"></SliderNavigationComponent>
                    <SliderNavigationComponent name="Locations"></SliderNavigationComponent>
                </ul>
                <form method="POST" action='/logout'>
                    <input type="hidden" name="_token" :value="csrf"/>

                    <button class="text-white">
                        Logout
                    </button>
                </form>
            </div>
        </BackdropComponent>
    </div>
</template>


<script>
    import SliderNavigationComponent from './SliderNavigationComponent';
    import BackdropComponent from '../BackdropComponent';

    export default {
        data() {
            return {
                showSliderState: false,
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        },

        methods: {
            toggleSliderState() {
                this.showSliderState = !this.showSliderState;
            }
        },

        components: {
            SliderNavigationComponent,
            BackdropComponent
        }
    }
</script>