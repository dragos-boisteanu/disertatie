<template>
    <BackdropComponent @click.native="close">
        <NavigationComponent/>
    </BackdropComponent>
</template>

<script>
    import NavigationComponent from '../navigation/NavigationComponent';
    import BackdropComponent from '../BackdropComponent';

    export default {
        data() {
            return {
                
            }
        },

        methods: {
            close() {
                this.$emit('close');
            }
        },

        components: {
            BackdropComponent,
            NavigationComponent
        },
    }
</script>