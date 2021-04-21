<template>
 <!-- :class="{'disabled pointer-events-none bg-gray-100': waiting }" -->
    <div class="w-full">
        <div v-if="hasDiscount" class="mb-2 flex items-center gap-x-2 my-1">
            <div
                class="text-xs p-1 px-2 bg-white rounded border flex items-center gap-x-1 cursor-pointer hover:border-gray-600"
               
                @click="removeDiscount"
            > 
                <span>  {{ discount.code }}</span>
                <span> {{ discount.value }}% </span>
                <span>
                    |
                </span>
                <span>
                    {{ discount.fromDate}} 
                </span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>
                </span>
                <span>
                    {{ discount.toDate }}
                </span>
            </div>
        </div>

        <div>
            <button
                class="px-2 py-1 border rounded-sm text-sm hover:border-gray-600 active:shadow-inner disabled:pointer-events-none"
                @click.prevent="openModal"   
            >
                Add discount
            </button>
        </div>
    </div>
</template>

<script>
    export default {

        props: {
            discount: {
                type: Object,
                require: true,
                default: null
            }
        },

        computed: {
            hasDiscount() {
                return this.discount ? true : false;
            }
        },

        methods: {
            openModal() {
                this.$emit('openModal');
            },

            removeDiscount() {
                this.$emit('removeDiscount', this.discount.id);
            }
        }
    }
</script>