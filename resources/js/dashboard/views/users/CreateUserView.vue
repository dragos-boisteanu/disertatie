<template>
    <ViewContainer>
        <template slot="header">
            Create user account
        </template>

        <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
            <form @submit.prevent="handleSubmit(submit)" class="flex flex-col">
                <div class="flex flex-col lg:items-start lg:gap-x-6 xl:w-full 2xl:w-3/4">
                    <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">
                        <h2 class="mb-5 text-xl font-semibold">
                            Account details
                        </h2>

                        <ImageUploadComponent
                            :disabled="waiting || waitForFileUpload"
                            :clear="clearImage"
                            @waitForFileToUpload="toggleWaitForFileUpload"
                            @setImagePath="setImagePath"
                        ></ImageUploadComponent>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                            <ValidationProvider 
                                vid="data.user.first_name" 
                                rules="required|alpha_spaces|max:50" 
                                v-slot="{ errors, failed, passed }"
                                class="flex-1"
                            >
                                <label for="firstName" class="text-sm font-semibold">First name</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="firstName"
                                    name="first name" 
                                    type="text" 
                                    v-model="user.first_name" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>
                            <ValidationProvider 
                                vid="data.user.name" 
                                rules="required|alpha_spaces|max:50" 
                                v-slot="{ errors, failed, passed }"
                                class="flex-1"
                            >
                                <label for="name" class="text-sm font-semibold">Name</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="name" 
                                        type="text" 
                                        name="name"
                                        v-model="user.name" 
                                        :disabled="waiting"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                    />
                            </ValidationProvider>
                            <ValidationProvider 
                                vid="data.user.birthdate" 
                                rules="required" 
                                v-slot="{ errors, failed, passed }"
                                class="flex-1"
                            >
                                <label for="birthdate" class="text-sm font-semibold">Birthdate</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="birthdate" 
                                        type="date" 
                                        name="birthdate"
                                        v-model="user.birthdate"
                                        :disabled="waiting"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"   
                                    />
                            </ValidationProvider>
                        </div>
                        
                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:gap-x-4">
                            <ValidationProvider 
                                vid="data.user.email" 
                                rules="required|email|max:100" 
                                v-slot="{ errors, failed, passed }"
                                class="flex-1"
                            >
                                <label for="email" class="text-sm font-semibold">Email</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="email" 
                                    type="email" 
                                    name="email"
                                    v-model="user.email" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': failed, 'border-green-500' : passed}"   
                                />
                            </ValidationProvider>
                            <ValidationProvider  
                                vid="data.user.phone_number" 
                                rules="required" 
                                v-slot="{ errors, failed, passed }"
                                class="flex-1"
                            >
                                <label for="phone_number" class="text-sm font-semibold">Phone number</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="phoneNumber" 
                                    type="text" 
                                    name="phone number"
                                    v-model="user.phone_number"
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                :class="{'border-red-600': failed, 'border-green-500' : passed}"
                                />
                            </ValidationProvider>
                        </div>
                        
                        <ValidationProvider 
                            vid="data.user.role" 
                            rules="required|integer" 
                            v-slot="{ errors, failed, passed }" 
                        >
                            <label for="role" class="text-sm font-semibold">Role</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <select 
                                    id="role"
                                    name="role"
                                    v-model="user.role_id" 
                                    :disabled="waiting"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500 capitalize"
                                   :class="{'border-red-600': failed, 'border-green-500' : passed}" 
                                >
                                    <option v-for="role in getRoles" :key="role.id" :value="role.id">{{role.name}}</option>
                                </select>
                        </ValidationProvider>
                    </div>

                    <div class="mt-5 flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 border-b border-gray-200 lg:mt-0 lg:border-r lg:pr-5 lg:border-b-0 lg:flex-1">
                        <h2 class="mb-5 text-xl font-semibold">
                            <input id="addressToggle" type="checkbox" v-model="required" @click="toggleAddressState"> 
                            <label for="addressToggle">Address (optional)</label>
                        </h2>

                        <ValidationObserver ref="addressForm" class="flex flex-col gap-y-4"> 
                            <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">                  
                                <ValidationProvider 
                                    vid="data.address.first_name" 
                                    :rules="{'required': required, 'alpha_spaces': true, max:50}" 
                                    v-slot="{ errors, failed, passed }"
                                    class="flex-1"
                                >
                                    <label for="addressFirstName" class="text-sm font-semibold">First name</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="addressFirstName" 
                                        name="first name"
                                        type="text" 
                                        v-model="address.first_name"
                                        :disabled="waiting || !required"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': failed, 'border-green-500' : passed && required}"
                                    />
                                </ValidationProvider>      
                                <ValidationProvider 
                                    vid="data.address.name" 
                                    :rules="{'required': required, 'alpha_spaces': true, max:50}" 
                                    v-slot="{ errors, failed, passed }"
                                    class="flex-1"
                                >
                                    <label for="addressName" class="text-sm font-semibold">Name</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="addressName" 
                                        type="text" 
                                        name="name"
                                        v-model="address.name" 
                                        :disabled="waiting || !required"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                        :class="{'border-red-600': failed, 'border-green-500' : passed && required}"
                                    />
                                </ValidationProvider>
                                <ValidationProvider 
                                    vid="data.address.phone_number" 
                                    :rules="{'required': required, max:50}" 
                                    v-slot="{ errors, failed, passed }"
                                    class="flex-1"
                                >
                                    <label for="addressPhoneNumber" class="text-sm font-semibold">Phone number</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="addressPhoneNumber" 
                                        type="text" 
                                        name="phone number"
                                        v-model="address.phone_number" 
                                        :disabled="waiting || !required"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                                    :class="{'border-red-600': failed, 'border-green-500' : passed && required}"
                                    />
                                </ValidationProvider>
                            </div>

                            <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">                  
                                <ValidationProvider 
                                    vid="data.address.county_id" 
                                    :rules="{'required': required, 'integer': true}" 
                                    v-slot="{ errors, failed, passed }"
                                    class="flex-1"
                                >    
                                    <label for="addressCounty" class="text-sm font-semibold">County</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <select 
                                        id="addressCounty"
                                        name="country"
                                        v-model="address.county_id"
                                        @change="getCitites" 
                                        :disabled="waiting || !required"   
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                        :class="{'border-red-600': failed, 'border-green-500' : passed && required}"
                                    >
                                        <option value="" disabled>Select user country</option>
                                        <option v-for="county in getCounties" :key="county.id" :value="county.id"> {{county.name}} </option>
                                    </select>
                                </ValidationProvider>
                                <ValidationProvider 
                                    vid="data.address.city_id" 
                                    :rules="{'required': required, 'integer': true}" 
                                    v-slot="{ errors, failed, passed }"
                                    class="flex-1"
                                >
                                    <label for="addressCity" class="text-sm font-semibold">City</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <select 
                                        id="addressCity"
                                        name="city"
                                        v-model="address.city_id"
                                        :disabled="citiesSelectState || waiting || !required"
                                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600': failed, 'border-green-500' : passed && required}"               
                                    >
                                        <option value="" disabled>Select user city</option>
                                        <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option>
                                    </select>
                                </ValidationProvider>
                            </div>
                                
                            <ValidationProvider vid="data.address.address" :rules="{'required': required, 'alpha_spaces': true, max:255}" v-slot="{ errors, failed, passed }">
                                <label for="addressAddress" class="text-sm font-semibold">Address</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <input 
                                    id="addressAddress" 
                                    name="address"
                                    type="text" 
                                    v-model="address.address"
                                    :disabled="waiting || !required"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                :class="{'border-red-600': failed, 'border-green-500' : passed && required}"    
                                />
                            </ValidationProvider>
                        </ValidationObserver>
                    </div>
                </div>

                <div class="mt-5 flex md:justify-start">
                    <button 
                        type="submit"
                        :disabled="waiting || waitForFileUpload"  
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
    
    import ImageUploadComponent from '../../components/ImageUploadComponent';

    export default {

        computed: {
            ...mapGetters('Counties', ['getCounties']),
            ...mapGetters('Roles', ['getRoles']),

            citiesSelectState() {
                return this.address.county_id ? false : true;
            }
        },

        data() {
            return {
                waitForFileUpload: false,
                waiting: false,

                counties: [],
                cities: [],

                clearImage: false,

                required: false,

                user: {
                    image: '',
                    first_name: '',
                    name: '',
                    email: '',
                    phone_number: '',
                    birthdate: '',
                    role_id: 1,
                },

                address: {
                    first_name: '',
                    name: '',
                    phone_number: '',
                    county_id: '',
                    city_id: '',
                    address: ''
                },
            }
        },

        methods: {
            ...mapActions('Users', ['addUser']),
            ...mapActions('Counties', ['fetchCitites']),

            async submit() {
                try {
                    this.$Progress.start()

                    this.waiting = true;
                    const payload = {
                        user: this.user
                    }

                    if(this.required) {
                        payload.address = this.address
                    }

                    await this.addUser(payload);
                    this.restForm();
                    this.waiting = false;

                    this.$Progress.finish()

                } catch ( error ) {  
                    this.$Progress.fail()
                    if(error.response.data.errors) {
                        this.$refs.observer.setErrors(error.response.data.errors)
                    }  
                     console.log(error)       
                
                    this.waiting = false;
                }
            },
            
            async getCitites() {
                try {
                    this.cities= await this.fetchCitites(this.address.county_id);
                } catch ( error ) {
                    console.log(error)
                }
            },

            restForm() {
                this.$refs.observer.reset();

                this.cities = [];
                this.files = [];

                if(this.user.avatar) {
                    delete this.user.avatar
                    this.clearImage = true;
                }

                this.user = {
                    first_name: '',
                    name: '',
                    email: '',
                    phone_number: '',
                    birthdate: '',
                    role_id: 1,
                }

                this.address = {
                    state: false,
                    first_name: '',
                    name: '',
                    phone_number: '',
                    county_id: '',
                    city_id: '',
                    address: ''
                }
            },

            toggleAddressState() {
                if(this.required) {
                    this.address = {
                        first_name: '',
                        name: '',
                        phone_number: '',
                        county_id: '',
                        city_id: '',
                        address: ''
                    }
                }
                this.$refs.addressForm.reset();
                this.required = !this.required
            },

            toggleWaitForFileUpload(waitForFileToUpload) {
                console.log(waitForFileToUpload);
                this.waitForFileUpload = waitForFileToUpload;
            },

            setImagePath(imagePath) {
                this.user.avatar = imagePath;
            },
        },

        components: {
            ViewContainer,
            ImageUploadComponent
        }
    }
</script>