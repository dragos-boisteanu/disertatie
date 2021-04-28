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
                            <span> ({{category.productsCount}})</span>
                        </div>
                        <div>
                            <button v-if="allowRemoval(category.productsCount)" @click="removeCategory(category.id)"> X</button>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="mt-4 md:mt-0 lg:flex-1">
                <form @submit.prevent="submit" class="flex flex-col items-stretch justify-items-start gap-y-3 md:flex-auto">
                    <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5">
                        <h2 class="mb-4 text-xl font-semibold">
                            Category
                        </h2> 

                        <div>
                            <label for="name" class="text-sm font-semibold">Name</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.category.name.$error"> 
                                <p v-if="!$v.category.name.required">
                                    The name field is required
                                </p>
                                <p v-if="!$v.category.name.alphaSpaces">
                                    The name field must contain only letters and spaces
                                </p>
                                <p v-if="!$v.category.name.maxLength">
                                    The name field must shorter than 50 characters
                                </p>
                            </div>
                            <input 
                                id="name"
                                name="name" 
                                type="text" 
                                @keyup="$v.category.name.$touch()"
                                @blur="$v.category.name.$touch()"
                                v-model="category.name" 
                                :disabled="waiting"   
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"  
                                :class="{'border-red-600': $v.category.name.$error}"
                            />
                            
                        </div> 
                        
                        <div class="w-full flex items-center gap-x-4">
                            <div class="w-full">
                                <label for="vat" class="text-sm font-semibold">VAT</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.category.vat.$error">
                                    <p v-if="!$v.category.vat.required">
                                        The vat field is required
                                    </p>
                                    <p v-if="!$v.category.vat.numeric">
                                        The vat field must be only numeric
                                    </p>
                                    <p v-if="!$v.category.vat.integer">
                                        The vat field must be an integer
                                    </p>
                                    <p v-if="!$v.category.vat.minValue">
                                        The vat field must be equal or greater than 0
                                    </p>
                                </div>
                                <input 
                                    id="vat"
                                    name="vat" 
                                    type="texy" 
                                    @keyup="$v.category.vat.$touch()"
                                    @blur="$v.category.vat.$touch()"
                                    v-model="category.vat"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"  
                                    :class="{'border-red-600': $v.category.vat.$error}"
                                    :disabled="waiting" 
                                />
                            </div>

                            <div class="flex-grow-0 flex-shrink">
                                <label for="vat" class="text-sm font-semibold">Color</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.category.color.$error">
                                    <p v-if="!$v.category.color.required">
                                        The color field is required
                                    </p>
                                </div>
                                <input 
                                    id="color" 
                                    name="color"
                                    type="color"
                                    @keyup="$v.category.color.$touch()"
                                    @blur="$v.category.color.$touch()"
                                    v-model="category.color"
                                    class="p-1 rounded border order-gray-300 outline-none"   
                                    :class="{'border-red-600' : $v.category.color.$error}"
                                    :disabled="waiting" 
                                    />
                            </div>
                        </div>
                        <DiscountComponent
                            :discount="category.discount"
                            @saved="saveDiscount"
                            @removed="removeDiscount"
                        ></DiscountComponent>
                    </div>
                    
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
    import _isEqual from 'lodash/isEqual'

    import { alphaSpaces } from '../../validators/index';
    import { required, numeric, integer, maxLength, minValue } from 'vuelidate/lib/validators'

    export default {
        
        computed: {
            ...mapGetters('Categories', ['getCategories']),

            showResetSearch() {
                return this.searchInput.length > 0;
            },
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

        validations: {
            category: {
                name: {
                    required,
                    maxLength: maxLength(50),
                    alphaSpaces
                },
                vat: {
                    required,
                    numeric,
                    integer,
                    minValue: minValue(0)
                },
                color: {
                    required
                }
            }
        },

        methods: {
            ...mapActions('Categories', ['searchCategory', 'fetchCategories', 'postCategory', 'patchCategory', 'deleteCategory']),
            ...mapActions('Notification', ['openNotification']),
        
            allowRemoval(productsCount) {
                return parseInt(productsCount) === 0
            },

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
                    this.$v.$touch();
                    if(!this.$v.$invalid) {
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
                                if(key === 'discount' && !_isEqual(this.category[key], originalCategory[key])) {
                                    payload.category[key] = this.category[key];
                                    counter++;
                                    console.log('here')
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
                                });
                            } else {
                                this.openNotification({
                                    type: 'info',
                                    show: true,
                                    message: 'Nothing to update'
                                });
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
                    }                  

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
                        message: 'Category removed'
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
                    discount: null
                }
            },
        },

        components: {
            ViewContainer,
            DiscountComponent
        }
    }
</script>