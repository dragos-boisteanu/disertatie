<template>
    <div class="py-1 px-2 text-xs text-white rounded-sm"
        :class="statusClass"
    >
       {{ status }}                              
    </div>
</template>


<script>
    export default {
        props: {
            deletedAt: {
                typeof: String,
                required: true
            }
        },

        computed: {
            status(){
                return this.deletedAt === null ? 'Active' : 'Disabled'
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