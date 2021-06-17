<template>
    <div class="fixed px-4 py-2 bottom-8 left-1/2 transform -translate-x-1/2 rounded-lg text-center shadow-md z-20 lg:top-36 lg:bottom-auto" style="min-width: 100px" v-bind:class="type">
        <span class="text-sm text-white">
            {{ notification.message}}
        </span>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        props: {
            notification: {
                type: Object,
                required: true
            }
        },

        mounted() {
            if(this.notification.show) {
                this.timerId = setTimeout( () => {
                    this.closeNotification();
                }, this.notification.activeTime);
            }
        },

        data() {
            return {
                timerId: 0,
                classType: this
            }
        },

        destroyed(){
            clearTimeout(this.timerId);
        },

        computed: {
            type() {
                let type = '';

                switch(this.notification.type) {
                    case 'ok':  type = 'bg-green-600'; break;
                    case 'err':  type =  'bg-red-600'; break;
                    case 'info': type = 'bg-blue-800'; break;
                }

                return type;
            }
        },
        methods: {
            ...mapActions('Notification', ['closeNotification']),
        }
    }
</script>

<style>
    
</style>