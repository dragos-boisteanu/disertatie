<template>
     <ViewContainer>
        <template slot="header">
            <div class="flex items-center justify-between md:justify-start gap-x-4">
                <span>
                    Categories
                </span> 
                <button 
                    @click="refresh" 
                    class="p-1 bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                </button>
            </div>
        </template>

        <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2 ">
            <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
                <div class="w-full mb-2 pb-2 border-b flex items-center gap-x-2">
                    <div class="flex items-center w-full px-2 text-sm rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500">
                        <input 
                            name="search" 
                            id="search"
                            placeholder="Search category by name"
                            class="flex-1 outline-none py-2"
                            v-model="searchInput"
                            @input="search"
                        >
                    </div>
                </div>
                
                <ul class="px-2 mt-2 overflow-y-auto w-full max-h-80 md:flex-1 md:max-h-96 ">
                    <li 
                        v-for="(category, index) in getCategories" :key="category.id"
                        class="flex items-center justify-between border rounded-sm py-1 px-2 my-3 mr-2"
                    >
                        <div 
                            @click="selectCategory(category.id)"
                            class="cursor-pointer flex items-center gap-x-2">
                            <span>{{ index + 1 }}.</span>
                            <span class="rounded w-4 h-4" :style="{background: category.color}"></span>
                            <span>{{ category.name }}</span>
                            <span>{{ category.vat }} %</span>
                        </div>
                        <div>
                            <button @click="removeCategory(category.id)"> X</button>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="mt-4 flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 md:mt-0 lg:flex-1">
                <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
                    <form @submit.prevent="handleSubmit(submit)" class="flex flex-col items-stretch justify-items-start gap-y-3 md:flex-auto">
                        <h2 class="mb-5 text-xl font-semibold">
                            Category
                        </h2> 

                        <ValidationProvider vid="name" rules="required|alpha_spaces|max:50" v-slot="{ errors, failed, passed }" class="flex-grow flex-shrink-0">
                            <label for="name" class="text-sm font-semibold">Name</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <input 
                                id="name"
                                name="name" 
                                type="text" 
                                v-model="category.name" 
                                :disabled="waiting"   
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                :class="{'border-red-600': failed, 'border-green-500' : passed}"
                            />
                        </ValidationProvider> 
                        
                        <div class="w-full flex-1 flex items-center gap-x-4">
                            <ValidationProvider vid="vat" rules="required|integer" v-slot="{ errors, failed, passed }" class="w-full">
                                <label for="vat" class="text-sm font-semibold">VAT</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="vat"
                                    name="vat" 
                                    type="number" 
                                    v-model="category.vat" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>

                            <ValidationProvider vid="color" rules="required" v-slot="{  errors, failed, passed }" class="flex-grow-0 flex-shrink">
                                <label for="vat" class="text-sm font-semibold">Color</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="color" 
                                    name="color"
                                    type="color"
                                    v-model="category.color"
                                    :disabled="waiting" 
                                    class="p-1 rounded border order-gray-300 outline-none"   
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                    />
                            </ValidationProvider>
                        </div>

                        <DiscountComponent
                            :discount="category.discount"
                            @saved="saveDiscount"
                            @removed="removeDiscount"
                            :beginsAt="category.discountStartsAt"
                            :endsAt="category.discountEndsAt"
                        ></DiscountComponent>
                        <div>
                            <button 
                                v-if="categorySelected"
                                @click.prevent="clearSelection"
                                class="mb-3 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto"
                            >                       
                                Clear selection
                            </button>
                            <button 
                                type="submit"
                                :disabled="waiting"  
                                class="inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none"
                            >
                                <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>
                                    Submit
                                </span>
                            </button>
                        </div>                   
                        
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </ViewContainer>
</template>


<script>
    import { mapGetters, mapActions } from 'vuex';
    import ViewContainer from '../ViewContainer';
    import DiscountComponent from '../../components/discounts/DiscountComponent';

    import _find from 'lodash/find';
    import _debounce from 'lodash/debounce'

    export default {
        
        computed: {
            ...mapGetters('Categories', ['getCategories']),
            showResetSearch() {
                return this.searchInput.length > 0;
            }
        },

        data() {
            return {
                waiting: false,
                categorySelected: false,
                category: {
                    name: '',
                    vat: '',     
                    color: '',   
                    discount: null           
                },
                searchInput: ''
            }
        },

        methods: {
            ...mapActions('Categories', ['searchCategory', 'fetchCategories', 'postCategory', 'patchCategory', 'deleteCategory']),
            ...mapActions('Notification', ['openNotification']),
        
            selectCategory(id) {
                this.category = Object.assign(this.category, _find(this.getCategories, ['id', id]));
                this.categorySelected = true;
            },

            clearSelection() {
                this.categorySelected = false;
                this.resetForm();
            },

            async submit() {
                try {
                    this.waiting = true;
                    this.$Progress.start();

                    if(this.categorySelected) {
                        const originalCategory = _find(this.getCategories, ['id', this.category.id]);

                        const payload = {
                            vm: this,
                            category: {
                                id: originalCategory.id
                            }
                        }

                        let counter = 0;

                        Object.keys(this.category).forEach(key => {
                            if(key === 'discount' && this.category[key] ) {
                                console.log(this.category['discount']);
                                payload.category[key] = this.category[key];
                                counter++;
                            } else if(originalCategory[key] !== this.category[key]) {
                                payload.category[key] = this.category[key];
                                counter++;
                            }
                        })

                        if(counter > 0) {
                            await this.patchCategory(payload);

                            this.openNotification({
                                type: 'ok',
                                show: true,
                                message: 'Category updated'
                            })

                        } else {
                            this.openNotification({
                                type: 'info',
                                show: true,
                                message: 'Nothing to update'
                            })
                        }

                    } else {
                        await this.postCategory(this.category);
                        
                        this.resetForm();

                        this.openNotification({
                            type: 'ok',
                            show: true,
                            message: 'Category added'
                        })
                    }

                    this.waiting = false;
                    this.$Progress.finish();

                } catch ( error ) {

                    console.log(error)

                    this.$Progress.fail();
                    this.waiting = false;

                    if(error.response.data.errors) {
                        this.$refs.observer.setErrors(error.response.data.errors)
                    }  
                    // notificaiton
                }
            },

            async removeCategory(id) {
                try {
                    this.$Progress.start();

                    await this.deleteCategory(id);

                    this.$Progress.finish();
                    this.openNotification({
                        type: 'ok',
                        show: true,
                        message: 'Category deleted'
                    })
                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error)
                }
            },

            async refresh() {
                try {
                    this.$Progress.start();

                    await this.fetchCategories();
                    
                    this.$Progress.finish();
                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error)
                }
            },

            search: _debounce( async function() {
                try {
                    this.$Progress.start();

                    if(this.searchInput.length > 0) {
                         await this.searchCategory(this.searchInput);
                    } else {
                        await this.fetchCategories();
                    }
                    
                    this.$Progress.finish();
                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error)
                }
               
            }, 250),

            saveDiscount(discount){
                this.category.discount = discount;
            },

            removeDiscount() {
                this.category.discount = null;
            },

            resetForm() {
                this.$refs.observer.reset();
                this.category = {
                    name: '',
                    vat: '',
                    color:'',
                }
            },
        },

        components: {
            ViewContainer,
            DiscountComponent
        }
    }
</script>