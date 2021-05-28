<template>
    <div>
        {{message}}
    </div>
</template>


<script>
    export default {
        mounted() {
            window.Echo.channel('home')
                        .listen('NewMessage', (e) => {this.message = e.message});
        },

        data() {
            return {
                message: ''
            }
        },
    }
</script>