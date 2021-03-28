<template>
    <span v-if="category">
        {{ category.vat }}% VAT
    </span>
</template>


<script>    
    import _find from 'lodash/find';
    import { mapGetters } from 'vuex';

    export default {
        props: {
            categoryId: {
                type:Number,
                required: true,
            }
        },

        computed: {
            ...mapGetters('Categories', ['getCategories']),

            category() {
                return _find(this.getCategories, ['id', this.categoryId]);
            }
        }
        
    }
</script>
