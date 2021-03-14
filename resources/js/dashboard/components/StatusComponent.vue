<template>
    <div class="py-1 px-2 mt-2 text-xs text-white rounded-sm"
        :class="statusClass"
    >
       {{ status }}                              
    </div>
</template>


<script>
    export default {
        props: ['deletedAt'],

        computed: {
            status(){
                return this.deletedAt === null ? 'Active' : 'Removed'
            },

            statusClass() {
                return {
                    'bg-green-500': this.deletedAt === null,
                    'bg-red-500':this.deletedAt !== null
                }
            }
        }
    }
</script>