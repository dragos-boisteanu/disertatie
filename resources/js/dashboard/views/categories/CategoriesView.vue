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

        <div class="w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2">
            <div class="flex flex-col bg-white shadow rounded-sm p-5 md:flex-1">
                <div class="w-full mb-2 flex items-center gap-x-2">
                    <div class="w-full p-2 flex items-center bg-gray-50">
                        <svg class="text-coolGray-300 fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                        <input 
                            name="search" 
                            id="search"
                            placeholder="Search category by name"
                            class="w-full outline-none px-2 rounded bg-gray-50"
                            v-model="searchInput"
                            @input="search"
                        >
                    </div>
                </div>

                <table class="px-2 w-full rounded-sm max-h-80 md:max-h-96">
                    <thead class="w-full bg-gray-700 text-orange-500">
                        <tr class="text-left text-sm">
                            <th class="p-2 text-center">Index</th>
                            <th class="p-2">Color</th>
                            <th class="p-2">Name</th>
                            <th class="p-2">Vat</th>
                            <th class="p-2">Count</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="max-h-36 overflow-y-auto">
                        <tr 
                            v-for="(category, index) in getCategories" :key="category.id"
                            @click="selectCategory(category.id)"
                            class="transition-shadow transition-transform duration-500 ease-in-out text-sm rounded-md cursor-pointer border-white transform hover:-translate-y-1
                            hover:bg-gray-50 hover:shadow-md"
                        >
                            <td class="p-2 text-center font-semibold">{{ index + 1 }}</td>
                            <td class="p-2">
                                <div class="rounded w-4 h-4" :style="{background: category.color}"></div>
                            </td>
                            <td class="p-2">{{ category.name }}</td>
                            <td class="p-2">{{ category.vat }} %</td>
                            <td class="p-2">{{ category.productsCount }}</td>
                            <td class="p-2 flex items-center justify-center">
                                <button v-if="allowRemoval(category.productsCount)" @click="removeCategory(category.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <!-- <ul class="px-2 mt-2 overflow-y-auto w-full max-h-80 md:flex-1 md:max-h-96 ">
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
                </ul> -->
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
                                @input="$v.category.name.$touch()"
                                v-model="category.name" 
                                :disabled="waiting"   
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"  
                                :class="{'border-red-600' : $v.category.name.$error, 'border-green-600': $v.category.name.$dirty && !$v.category.name.$error}"
                            />
                        </div> 
                        
                        <div class="w-full flex items-center gap-x-4">
                            <div class="w-full">
                                <label for="vat" class="text-sm font-semibold">VAT</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.category.vat.$error">
                                    <p v-if="!$v.category.vat.required">
                                        The vat field is required
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
                                    @input="$v.category.vat.$touch()"
                                    v-model="category.vat"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"  
                                    :class="{'border-red-600': $v.category.vat.$error, 'border-green-600': $v.category.vat.$dirty && !$v.category.vat.$error}"
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
                                    @change="$v.category.color.$touch()"
                                    v-model="category.color"
                                    class="p-1 rounded border order-gray-300 outline-none"   
                                    :class="{'border-red-600': $v.category.color.$error, 'border-green-600': $v.category.color.$dirty && !$v.category.color.$error}"
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
    import { required, integer, maxLength, minValue } from 'vuelidate/lib/validators'

    export default {
        
        computed: {
            ...mapGetters('Categories', ['getCategories']),

            showResetSearch() {
                return this.searchInput.length > 0;
            },

            rules() {
                return _merge({}, this.serverValidation, this.clientValidation);
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
                searchInput: '',
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

                    if(error.response && error.response.data.errors) {
                        this.$v.$touch();
                    }
                    
                    // notificaiton
                }
            },

            async removeCategory(id) {
                try {
                    this.$Progress.start();

                    await this.deleteCategory(id);

                    if(this.categorySelected) {
                        this.clearSelection();
                    }
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
                this.$v.$reset();
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