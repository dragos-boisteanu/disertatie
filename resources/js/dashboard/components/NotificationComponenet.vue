<template>
    <div class="fixed p-0.5 bottom-8 left-1/2 transform -translate-x-1/2 rounded-3xl text-center shadow-sm z-20" style="min-width: 100px" v-bind:class="type">
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

        data() {
            return {
                timerId: 0,
                classType: this
            }
        },

        created() {
            
            if(this.notification.show) {
                    this.timerId = setTimeout( () => {
                        this.closeNotification();
                }, this.notification.activeTime);
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
                    case 'err':   type =  'bg-red-600'; break;
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