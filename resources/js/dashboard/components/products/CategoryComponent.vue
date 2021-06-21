<template>
    <div class="flex items-center">
        <div class="py-1 px-2 text-xs ml-2 text-gray-800 bg-white rounded-sm border border-gray-800" v-if="category">
            {{category.name}}
        </div>
        <div class="py-1 px-2 text-xs ml-2 text-gray-200 bg-gray-800 rounded-sm " v-if="subCategory">
            {{subCategory.name}}
        </div>
        
    </div>
    
</template>

<script>
    import { mapGetters } from 'vuex'
    import _find from 'lodash/find';

    export default {
        props: {
            categoryId: {
                type: Number,
                required: true
            },
            subCategoryId: {
                type: Number,
                required: false,
                default: null,
            },
        },

        computed: {
            ...mapGetters('Categories', ['getCategories']),

            category() {
                return _find(this.getCategories, ['id', this.categoryId]);
            },

            subCategory() {
                if(this.subCategoryId) {
                   return _find(this.getCategories, ['id', this.subCategoryId]);
                }
               
            }
        }
    }

</script>