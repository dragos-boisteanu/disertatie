<template>
    <div class="py-1 px-2 text-xs  text-white rounded-sm"
        :class="statusClass"
    >
       {{ status.name }}                              
    </div>
</template>

<script>
    export default {
        props: {
            status: {
                typeof: Object,
                required: true
            }
        },

        computed: {
            statusClass() {
                let result = "";
                switch ( this.status.name ) {
                    case "Awaiting delivery":
                        result = 'bg-amber-500'
                        break;
                    case "Awaiting payment":
                        result = 'bg-amber-700';
                        break;
                    case "Awaiting reception":  
                        result = 'bg-amber-700';
                        break;
                    case "In delivery":
                        result = 'bg-amber-700';
                        break;
                    case "Is preparing": 
                        result = 'bg-amber-700';
                        break;
                    case "Canceled":
                        result = 'bg-red-600';
                        break;
                    case "Payment failed": 
                        result = 'bg-red-600'
                        break;
                    case "Completed": 
                        result = 'bg-green-600'
                        break;
                    case "Delivered": 
                        result = 'bg-lightBlue-400'
                        break;
                    case "Recived": {
                        result = 'bg-lightBlue-600'
                        break;
                    }
                }

                return result;
            }
        },
    }
</script>