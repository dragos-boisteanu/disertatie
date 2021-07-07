<template>
    <div class="py-1 px-2 ml-2 text-xs text-white rounded-sm"
        :class="statusClass"
    >
        <div v-if="notInStock">
            out of stock
        </div>
        <div v-else>
            {{ quantity }} in stock 
        </div>
                                   
    </div>
</template>

<script>
    export default {
        props: {
            quantity: {
                type: Number,
                required: true,
            }
        },

        computed: {
            status(){
                if(this.quantity === 0) {
                    return 0;
                }

                if(this.quantity > 0 && this.quantity <= 5) {
                    return 1;
                }

                if(this.quantity > 5 && this.quantity <= 15 ) {
                    return 2;
                }

                if(this.quantity > 15) {
                    return 3;
                }
            },

            notInStock() {
                return this.status === 0;
            },

            statusClass() {
                switch (this.status) {
                    case 0: return 'bg-red-600';
                    case 1: return 'bg-orange-400';
                    case 2: return 'bg-sky-600';
                    case 3: return 'bg-green-600'
                }
            }
        }
    }
</script>