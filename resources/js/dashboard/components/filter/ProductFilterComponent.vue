<template>
    <FilterComponent>
        <template slot="close">
            <svg 
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"
                @click="close"
            >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </template>
        <template slot="header">
            Products Filter
        </template>
        <div class="mt-5 px-3">
            <input 
                id="barcode" 
                name="barcode" 
                type="text"
                class="w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none"
                placeholder="Barcode"
                v-model="filterData.barcode"
                @keyup="callFilter"
            />

        </div>
    </FilterComponent>
</template>

<script>
    import FilterComponent from './FilterComponent';
    import { mapActions, mapGetters } from 'vuex';
    import _debounce from 'lodash/debounce';

    export default {

        computed: {
            ...mapGetters('Categories', ['getCategories']),
        },


        data() {
            return {
                filterData: {
                    barcode: '',
                    id: '',
                    name: '',
                    status: '',
                    category: '',
                    priceStart: '',
                    priceEnd: '',
                    quantityStart: '',
                    quantityEnd:''
                }
            }
        },

        methods: {
            ...mapActions('Products', ['fetchProducts']),

            callFilter: _debounce( async function() {
                try {
                    const query = {}

                    Object.keys(this.filterData).forEach(key => {
                        if(this.filterData[key].length > 0) {
                            query[key] = this.filterData[key];
                        }
                    })

                    // this.$router.replace({name:'Products', query: {...query}});
                
                    await this.fetchProducts(query);

                  
                } catch ( error ) {
                    console.log(error)
                }
            }, 750),

            close() {
                this.$emit('closed')
            }
        },

        components: {
            FilterComponent
        }
    }
</script>