<template>
    <div class="mt-4 flex items-center justify-between text-xs md:justify-end">
            <div v-if="showNextAndPrevious">
                <router-link 
                    :to="{name: route, query: {page:previousPage, ...query} }" 
                    @click.prevent.native="goTo(previousPage)" 
                    class="px-2 py-1 border hover:border-lightBlue-500" 
                    :class="{'pointer-events-none': !canPrevious, 'border-gray-200': !canPrevious, 'border-gray-300': canPrevious}"
                >
                    Previous
                </router-link>
            </div>
            <div v-else></div>
            <ul class="flex items-center gap-x-2 md:mx-3">
                <li v-for="(page, index) in lastPage" :key="index">
                    <router-link 
                        @click.prevent.native="goTo(page)" 
                        :to="{name: route, query: {page, ...query}}"   
                        class="px-2 py-1 border  hover:border-lightBlue-500 rounded-sm" 
                        :class="{'border-lightBlue-500': page === currentPage, 'border-gray-300': page !== currentPage}"
                        
                    >
                        {{ page }}
                    </router-link>  
                </li>
            </ul>
            <div v-if="showNextAndPrevious">
                <router-link 
                    :to="{name: route, query: {page:nextPage, ...query}}" 
                    @click.prevent.native="goTo(nextPage)" 
                    class="px-2 py-1 border hover:border-lightBlue-500" 
                    :class="{'pointer-events-none': !canNext, 'border-gray-200': !canNext, 'border-gray-300': canNext}"
                >
                    Next
                </router-link>
            </div>
            <div v-else></div>
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
            currentPage() {
                return this.data.currentPage;
            },

            lastPage() {
                return this.data.lastPage;
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
                const query = {
                    page,
                    ...this.query
                }
                this.$emit('navigate', query);
            }
        }
    }
</script>
