<template>
     <ViewContainer>
        <template slot="header">
            Categories
        </template>

        <div class="w-full md:flex xl:w-3/4 2xl:w-1/2 ">
            <ul class="px-2 overflow-y-scroll w-full max-h-80 md:flex-1 md:max-h-96 ">
                <li 
                    v-for="(category, index) in getCategories" :key="category.id"
                    class="flex items-center justify-between border rounded-sm py-1 px-2 my-3"
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

            <div class="mt-5 md:flex-1 md:mt-0">
                <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
                    <form @submit.prevent="handleSubmit(submit)" class="flex flex-col w-full">
                        <div class="flex flex-col items-stretch justify-items-start gap-y-3 pt-5 border-t border-gray-200 md:border-l md:pl-5 md:border-t-0 md:pt-0 md:flex-auto">
                            <h2 class="mb-5 text-xl font-semibold">
                                Categories
                            </h2> 

                            <ValidationProvider vid="name" rules="required|alpha_spaces|max:50" v-slot="{ errors, failed, passed }" class="flex-grow flex-shrink-0">
                                <label for="name" class="text-sm font-semibold">Nane</label>
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
                                <ValidationProvider vid="vat" rules="required|double:2,dot" v-slot="{ errors, failed, passed }" class="w-full">
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
                            <div>
                                <button 
                                    v-if="categorySelected"
                                    @click.prevent="clearSelection"
                                    class=" mb-3 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto"
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
    import _find from 'lodash/find';


    export default {

        computed: {
            ...mapGetters('Categories', ['getCategories']),
        },

        data() {
            return {
                waiting: false,
                categorySelected: false,
                category: {
                    name: '',
                    vat: '',     
                    color: '',               
                },
            }
        },

        methods: {
            ...mapActions('Categories', ['postCategory', 'patchCategory', 'deleteCategory']),
        
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

                        console.log(payload)

                        let counter = 0;

                        Object.keys(originalCategory).forEach(key => {
                            if(originalCategory[key] !== this.category[key]) {
                                payload.category[key] = this.category[key];
                                counter++;
                            }
                        })

                        if(counter > 0) {
                            await this.patchCategory(payload);

                        } else {
                            console.log('nothing to update')
                            // notification
                        }

                    } else {
                        await this.postCategory(this.category);
                        
                        this.resetForm();
                    }

                    this.waiting = false;
                    this.$Progress.finish();

                } catch ( error ) {

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
                } catch ( error ) {
                    this.$Progress.fail();
                    console.log(error)
                }
            },

            resetForm() {
                this.$refs.observer.reset();
                this.category = {
                    name: '',
                    vat: '',
                    color:'',
                }
            }
        },

        components: {
            ViewContainer
        }
    }
</script>