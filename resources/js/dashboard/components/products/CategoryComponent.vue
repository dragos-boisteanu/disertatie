<template>
    <div class="flex items-center">
        <div class="py-1 px-2 text-xs ml-2 text-white rounded-sm" v-if="parentCategory" :style="{background: parentCategory.color}">
            {{parentCategory.name}}
        </div>
        <div class="py-1 px-2 text-xs ml-2 text-white rounded-sm" v-if="category" :style="{background: category.color}">
            {{category.name}}
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
            }
        },

        computed: {
            ...mapGetters('Categories', ['getCategories']),

            category() {
                return _find(this.getCategories, ['id', this.categoryId]);
            },

            parentCategory() {
                if(this.category.parentId) {
                    return _find(this.getCategories, ['id', this.category.parentId])
                }
               
            }
        }
    }

</script>