<template>
    <div class="my-4 flex items-center justify-between text-xs md:justify-end">
            <div>
                <router-link 
                    :to="{name: route, query: {page:previousPage, ...cleanQuery} }" 
                    @click.prevent.native="goTo(previousPage)" 
                    class="px-2 py-1 border hover:border-lightBlue-500" 
                    :class="{'pointer-events-none': !canPrevious, 'border-gray-200': !canPrevious, 'border-gray-300': canPrevious}"
                >
                    Previous
                </router-link>
            </div>
            <ul class="flex items-center gap-x-2 md:mx-3">
                <li v-for="(page, index) in lastPage" :key="index">
                    <router-link :to="{name: route, query: {page, ...cleanQuery} }" @click.prevent.native="goTo(page)"  
                        class="px-2 py-1 border  hover:border-lightBlue-500 rounded-sm" 
                        :class="{'border-lightBlue-500': page === currentPage, 'border-gray-300': page !== currentPage}"
                        
                    >
                        {{ page }}
                    </router-link>  
                </li>
            </ul>
            <div>
                <router-link 
                    :to="{name: route, query: {page:nextPage, ...cleanQuery}}" 
                    @click.prevent.native="goTo(nextPage)" 
                    class="px-2 py-1 border hover:border-lightBlue-500" 
                    :class="{'pointer-events-none': !canNext, 'border-gray-200': !canNext, 'border-gray-300': canNext}"
                >
                    Next
                </router-link>
            </div>
        </div>
</template>

<script>
    export default {
        props: {
            data: {
               type: Object,
               required: true,
            },

            route: {
                type: String,
                required: true,
            },

            query: {
                type: Object,
                required: true
            }    
        },

        computed: {
            cleanQuery() {
                const result = {};

                Object.keys(this.query).forEach( key => {
                    if(key !== 'page') {
                        result[key] = this.query[key];
                    }
                });

                return result;
            },

            currentPage() {
                return this.data.current_page;
            },

            lastPage() {
                return this.data.last_page;
            },

            showNextAndPrevious() {
                return this.lastPage > 1
            },

            canNext() {
                return this.currentPage < this.lastPage;
            },

            canPrevious() {
                return this.currentPage > this.firstPage
            },

            nextPage() {
                return this.currentPage + 1;
            },

            previousPage() {
                return this.currentPage - 1;
            }
        },

        data() {
            return {
                firstPage: 1
            }
        },

        methods: {
            goTo(page) {
                this.$emit('navigate', page);
            }
        }
    }
</script>
