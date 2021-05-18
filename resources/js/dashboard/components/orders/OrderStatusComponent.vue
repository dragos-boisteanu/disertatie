<template>
    <div class="py-1 px-2 text-xs text-black rounded-sm"
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
                switch ( this.status.id ) {
                    case 1:
                        result = ''
                        break;
                    case 2:
                        result = 'bg-lightBlue-600';
                        break;
                    case 3:  
                        result = '';
                        break;
                    case 5:
                        result = '';
                        break;
                    case 6: 
                        result = '';
                        break;
                    case 7:
                        result = '';
                        break;
                    case 8: 
                        result = ''
                    case 9: 
                        result = ''
                    case 10: 
                        result = ''
                }

                return result;
            }
        },
    }
</script>