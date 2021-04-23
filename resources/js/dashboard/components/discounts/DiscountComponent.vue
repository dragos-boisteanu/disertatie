<template>
    <div class="w-full flex flex-col items-start gap-y-2">
        <DiscountModal 
            v-if="showModal" 
            :prop-discount="discount" 
            @saved="save" 
            @closed="toggleModal"
        >
        </DiscountModal>

        <label for="discount" class="text-sm font-semibold">Discount</label>
        <div id="discount" v-if="hasDiscount" class="mb-2 flex items-center gap-x-2 my-1">
            <div
                class="text-xs p-1 px-2 bg-white rounded border flex items-center gap-x-1 cursor-pointer hover:border-gray-600"
                @click="removeDiscount"
            > 
                <span> {{ discount.code }} </span>
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
                <span class="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                </span>
            </div>
        </div>

        <div>
            <button
                class="px-2 py-1 border rounded-sm text-sm hover:border-gray-600 active:shadow-inner disabled:pointer-events-none"
                @click.prevent="toggleModal"   
            >
                <span v-if="hasDiscount">
                    Edit discount
                </span>
                <span v-else>
                    Add discount
                </span>
               
            </button>
        </div>
    </div>
</template>

<script>
    import DiscountModal from '../modals/DiscountModalComponent';

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

        data() {
            return {
                showModal: false
            }
        },

        methods: {
            toggleModal() {
                this.showModal = !this.showModal;
            },
            
            save(discount) {
                this.toggleModal();
                this.$emit('saved', discount);
            },

            removeDiscount() {
                this.$emit('removed');
            }
        },

        components: {
            DiscountModal
        }
    }
</script>