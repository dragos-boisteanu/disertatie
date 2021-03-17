<template>
    <ViewContainer>
        <template slot="header">
            Create user account
        </template>

        <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
            <form @submit.prevent="handleSubmit(submit)" class="flex flex-col">
                <div class="flex flex-col lg:flex-row lg:gap-x-6 lg:w-3/4">
                    <div class="pb-5 border-b border-gray-200 lg:border-r lg:pr-5 lg:border-b-0 lg:pb-0 lg:flex-auto">
                        <h2 class="mb-5 text-xl font-semibold">
                            Account details
                        </h2>
                        <div>
                            IMAGE UPLOAD
                        </div>
                        <div>
                            <label for="firstName" class="text-sm font-semibold">First name</label>
                            <ValidationProvider vid="firstName" rules="required|alpha_spaces|max:255" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="firstName"
                                    name="First name" 
                                    type="text" 
                                    v-model="user.first_name" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': errors[0]}"
                                />
                            </ValidationProvider>
                        </div>
                        <div class="mt-2">
                            <label for="name" class="text-sm font-semibold">Name</label>
                            <ValidationProvider rules="required|alpha_spaces|max:255" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="name" 
                                    type="text" 
                                    name="Name"
                                    v-model="user.name" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': errors[0]}"
                                />
                            </ValidationProvider>
                        </div>
                        <div class="mt-2">
                            <label for="birthdate" class="text-sm font-semibold">Birthdate</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="birthdate" 
                                    type="date" 
                                    name="Birthdate"
                                    v-model="user.birthdate"
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': errors[0]}"   
                                />
                            </ValidationProvider>
                        </div>
                        <div class="mt-2">
                            <label for="email" class="text-sm font-semibold">Email</label>
                            <ValidationProvider rules="required|email|max:255" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="email" 
                                    type="text" 
                                    name="Email"
                                    v-model="user.email" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': errors[0]}"   
                                />
                            </ValidationProvider>
                        </div>
                        <div class="mt-2">
                            <label for="phone_number" class="text-sm font-semibold">Phone number</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="phone_number" 
                                    type="text" 
                                    name="Phone number"
                                    v-model="user.phone_number"
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': errors[0]}"
                                />
                            </ValidationProvider>
                        </div>
                        <div class="mt-2">
                            <label for="role" class="text-sm font-semibold">Role</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <select 
                                    id="role"
                                    name="Role"
                                    v-model="user.role_id" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500 capitalize"
                                    :class="{'border-red-600': errors[0]}" 
                                >
                                    <option v-for="role in getRoles" :key="role.id" :value="role.id">{{role.name}}</option>
                                </select>
                            </ValidationProvider>
                        </div>

                        
                    </div>
                    <div class="mt-5 pb-5 lg:flex-auto lg:mt-0">
                        <h2 class="mb-5 text-xl font-semibold">
                            Address
                        </h2>
                        <div class="mt-2">
                            <label for="first_name" class="text-sm font-semibold">First name</label>
                            <ValidationProvider rules="required|alpha_spaces|max:255" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="first_name" 
                                    name="First name"
                                    type="text" 
                                    v-model="user.address.first_name"
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': errors[0]}"
                                />
                                </ValidationProvider>
                        </div>
                        <div class="mt-2">
                            <label for="name" class="text-sm font-semibold">Name</label>
                            <ValidationProvider rules="required|alpha_spaces|max:255" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="name" 
                                    type="text" 
                                    name="Name"
                                    v-model="user.address.name" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': errors[0]}"
                                />
                            </ValidationProvider>
                        </div>
                        <div class="mt-2">
                            <label for="phone_number" class="text-sm font-semibold">Phone number</label>
                            <ValidationProvider rules="required|max:255" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="phone_number" 
                                    type="text" 
                                    name="Phone number"
                                    v-model="user.address.phone_number" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': errors[0]}"
                                />
                            </ValidationProvider>
                        </div>
                        <div class="mt-2">
                            <label for="county" class="text-sm font-semibold">County</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <select 
                                    id="county"
                                    name="Country"
                                    v-model="user.address.county_id"
                                    @change="getCitites" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': errors[0]}"
                                >
                                    <option value="" disabled>Select user country</option>
                                    <option v-for="county in getCounties" :key="county.id" :value="county.id"> {{county.name}} </option>
                                </select>
                            </ValidationProvider>
                        </div>

                        <div class="mt-2">
                            <label for="city" class="text-sm font-semibold">City</label>
                            <ValidationProvider rules="required" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <select 
                                    id="city"
                                    name="City"
                                    v-model="user.address.city_id"
                                    :disabled="citiesSelectState || waiting"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': errors[0]}"               
                                >
                                    <option value="" disabled>Select user city</option>
                                    <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option>
                                </select>
                            </ValidationProvider>
                        </div>

                        <div class="mt-2">
                            <label for="address" class="text-sm font-semibold">Address</label>
                            <ValidationProvider rules="required|alpha_spaces|max:255" v-slot="{ errors }">
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="address" 
                                    name="Address"
                                    type="text" 
                                    v-model="user.address.address"
                                    :disabled="waiting"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': errors[0]}"    
                                />
                            </ValidationProvider>
                        </div>
                    </div>
                </div>
                <div class="mt-3 flex md:justify-start">
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
    </ViewContainer>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import ViewContainer from '../ViewContainer';

    export default {

        computed: {
            ...mapGetters('Counties', ['getCounties']),
            ...mapGetters('Roles', ['getRoles']),

            citiesSelectState() {
                return this.user.address.county_id ? false : true;
            }
        },

        data() {
            return {
                waiting: false,
                counties: [],
                cities: [],
                user: {
                    first_name: '',
                    name: '',
                    email: '',
                    phone_number: '',
                    birthdate: '',
                    role_id: 1,
                    address: {
                        first_name: '',
                        name: '',
                        phone_number: '',
                        county_id: '',
                        city_id: '',
                        address: ''
                    }
                }
            }
        },

        methods: {
            ...mapActions('Users', ['addUser']),
            ...mapActions('Counties', ['fetchCitites']),

            async submit() {
                try {
                    this.waiting = true;
                    await this.addUser(this.user);
                    this.restForm();
                } catch ( error ) {
                    console.log( error.response.data.errors);
                    // this.$refs.observer.setErrors({
                    //         firstName:[
                    //             "You must provide an email",
                    //             "This is not a valid eamil"
                    //         ]    
                        
                    // });
                    this.$refs.observer.setErrors(error.response.data.errors)
                    this.waiting = false;
                }
            },
            
            async getCitites() {
                try {
                    this.cities= await this.fetchCitites(this.user.address.county_id);
                } catch ( error ) {
                    console.log(error)
                }
            },

            restForm() {
                this.$refs.observer.reset();
                this.cities = [];
                this.user = {
                    first_name: '',
                    name: '',
                    email: '',
                    phone_number: '',
                    birthdate: '',
                    role_id: 1,
                    address: {
                        first_name: '',
                        name: '',
                        phone_number: '',
                        county_id: '',
                        city_id: '',
                        address: ''
                    }
                }
            }
        },

        components: {
            ViewContainer
        }
    }
</script>