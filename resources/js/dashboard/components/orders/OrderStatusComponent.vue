<template>
    <div class="py-1 px-2 text-xs text-white rounded-sm"
        :class="statusClass"
    >
       {{ statusText }}                              
    </div>
</template>


<script>
    import _find from 'lodash/find';
    import { mapGetters } from 'vuex';

    export default {
        props: {
            statusId: {
                typeof: [String, Number],
                required: true
            }
        },

        data() {
            return {
                statusText: ''
            }
        },

        computed: {
            ...mapGetters('Orders', ['getOrderStatuses']),
            statusClass() {
                let result = "";
                switch ( this.statusId ) {
                    case 1:
                        result = ''
                        this.getStatusText()
                        break;
                    case 2:
                        result = 'bg-lightBlue-600';
                        this.getStatusText()
                        break;
                    case 3:  
                        result = '';
                        this.getStatusText()
                        break;
                    case 5:
                        result = '';
                        this.getStatusText()
                        break;
                    case 6: 
                        result = '';
                        this.getStatusText()
                        break;
                    case 7:
                        result = '';
                        this.getStatusText()
                        break;
                    case 8: 
                        result = ''
                        this.getStatusText()
                    case 9: 
                        result = ''
                        this.getStatusText()
                    case 10: 
                        result = ''
                        this.getStatusText()
                }

                return result;
            }
        },

        methods: {
            getStatusText() {
                const status = _find(this.getOrderStatuses, ['id', parseInt(this.statusId)])
                this.statusText = status.name
            }
        },
    }
</script>