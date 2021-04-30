<template>
    <ViewContainer>
        <template slot="header">
            Create user account
        </template>
        <form @submit.prevent="submit" class="flex flex-col">
            <div class="flex flex-col lg:items-start lg:flex-row lg:gap-x-6 lg:w-full 2xl:w-3/4">
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
                        <div class="flex-1">
                            <label for="firstName" class="text-sm font-semibold">First name</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.user.first_name.$error">
                                <p v-if="!$v.user.first_name.required">
                                    The first name field is required
                                </p>
                                <p v-if="!$v.user.first_name.maxLength">
                                    The first name field should not be longer than 50 characters
                                </p>
                            </div>
                            <input 
                                id="firstName"
                                name="first name" 
                                type="text" 
                                v-model="user.first_name" 
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :disabled="waiting"  
                                :class="{'border-red-600' : $v.user.first_name.$error, 'border-green-600': $v.user.first_name.$dirty && !$v.user.first_name.$error}"
                                @blur="$v.user.first_name.$touch()"
                            />
                        </div>
                        <div class="flex-1">
                            <label for="name" class="text-sm font-semibold">Name</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.user.name.$error">
                                    <p v-if="!$v.user.name.required">
                                        The name field is required
                                    </p>    
                                    <p v-if="!$v.user.name.maxLength">
                                       The name field should not be longer than 50 characters
                                    </p>
                                </div>
                                <input 
                                    id="name" 
                                    type="text" 
                                    name="name"
                                    v-model="user.name"                                      
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600' : $v.user.name.$error, 'border-green-600': $v.user.name.$dirty && !$v.user.name.$error}"
                                    :disabled="waiting"
                                    @blur="$v.user.name.$touch()"
                                />
                        </div>
                        <div class="flex-1">
                            <label for="birthdate" class="text-sm font-semibold">Birthdate</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.user.birthdate.$error">
                                    <p v-if="!$v.user.birthdate.required">
                                        The birthdate field is required
                                    </p>
                                </div>
                                <input 
                                    id="birthdate" 
                                    type="date" 
                                    name="birthdate"
                                    v-model="user.birthdate"   
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600' : $v.user.birthdate.$error, 'border-green-600': $v.user.birthdate.$dirty && !$v.user.birthdate.$error}"
                                    :disabled="waiting"
                                    @blur="$v.user.birthdate.$touch()"
                                />
                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:gap-x-4">
                        <div class="flex-1">
                            <label for="email" class="text-sm font-semibold">Email</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.user.email.$error">
                                <p v-if="!$v.user.email.required">
                                    The email field is required
                                </p>
                                <p v-if="!$v.user.email.email">
                                    The email field must have valid email
                                </p>
                            </div>
                            <input 
                                id="email" 
                                type="email" 
                                name="email"
                                v-model="user.email" 
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                :class="{'border-red-600' : $v.user.email.$error, 'border-green-600': $v.user.email.$dirty && !$v.user.email.$error}"
                                :disabled="waiting"
                                @blur="$v.user.email.$touch()"
                            />
                        </div>
                        <div class="flex-1">
                            <label for="phone_number" class="text-sm font-semibold">Phone number</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.user.phone_number.$error">
                                <p v-if="!$v.user.phone_number.required">
                                    The phone number field is required
                                </p>
                            </div>
                            <input 
                                id="phoneNumber" 
                                type="text" 
                                name="phone number"
                                v-model="user.phone_number"        
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                :class="{'border-red-600' : $v.user.phone_number.$error, 'border-green-600': $v.user.phone_number.$dirty && !$v.user.phone_number.$error}"
                                :disabled="waiting" 
                                @blur="$v.user.phone_number.$touch()"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label for="role" class="text-sm font-semibold">Role</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.user.role_id.$error">
                                <p v-if="!$v.user.role_id.required">
                                    The role field is required
                                </p>
                            </div>
                            <select 
                                id="role"
                                name="role"
                                v-model="user.role_id"    
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500 capitalize"
                                :class="{'border-red-600' : $v.user.role_id.$error, 'border-green-600': $v.user.role_id.$dirty && !$v.user.role_id.$error}"
                                :disabled="waiting"
                                @blur="$v.user.role_id.$touch()"
                            >
                                <option v-for="role in getRoles" :key="role.id" :value="role.id">{{role.name}}</option>
                            </select>
                    </div>
                </div>

                <div class="mt-5 flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 border-b border-gray-200 lg:mt-0 lg:border-r lg:pr-5 lg:border-b-0 lg:flex-1">
                    <h2 class="mb-5 text-xl font-semibold">
                        <input id="addressToggle" type="checkbox" v-model="hasAddress" @click="toggleAddressState"> 
                        <label for="addressToggle">Address (optional)</label>
                    </h2>

                    <div ref="addressForm" class="flex flex-col gap-y-4"> 
                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">                  
                            <div class="flex-1">
                                <label for="addressFirstName" class="text-sm font-semibold">First name</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.address.first_name.$error">
                                    <p v-if="!$v.address.first_name.required">
                                        The first name field is required
                                    </p>
                                    <p v-if="!$v.address.first_name.maxLength">
                                        The first name field should not be longer than 50 characters
                                    </p>
                                </div>
                                <input 
                                    id="addressFirstName" 
                                    name="first name"
                                    type="text" 
                                    v-model="address.first_name" 
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600' : $v.address.first_name.$error, 'border-green-600': $v.address.first_name.$dirty && !$v.address.first_name.$error}"
                                    :disabled="waiting || !hasAddress"  
                                    @blur="$v.address.first_name.$touch()"
                                />
                            </div>      
                            <div class="flex-1">
                                <label for="addressName" class="text-sm font-semibold">Name</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.address.name.$error"> 
                                    <p v-if="!$v.address.name.required">
                                        The name field is required
                                    </p>
                                    <p v-if="!$v.address.name.maxLength">
                                        The first name field shound not be longer than 50 characters
                                    </p>
                                </div>
                                <input 
                                    id="addressName" 
                                    type="text" 
                                    name="name"
                                    v-model="address.name"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600' : $v.address.name.$error, 'border-green-600': $v.address.name.$dirty && !$v.address.name.$error}"
                                    :disabled="waiting || !hasAddress"   
                                    @blur="$v.address.name.$touch()"
                                />
                            </div>
                            <div  class="flex-1" >
                                <label for="addressPhoneNumber" class="text-sm font-semibold">Phone number</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.address.phone_number.$error">
                                    <p v-if="!$v.address.phone_number.required">
                                        The phone number field is required
                                    </p>
                                    <!-- phone number -->
                                </div>
                                <input 
                                    id="addressPhoneNumber" 
                                    type="text" 
                                    name="phone number"
                                    v-model="address.phone_number"  
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600' : $v.address.phone_number.$error, 'border-green-600': $v.address.phone_number.$dirty && !$v.address.phone_number.$error}"
                                    :disabled="waiting || !hasAddress" 
                                    @blur="$v.address.phone_number.$touch()"
                                />
                            </div>
                        </div>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">                  
                            <div class="flex-1">    
                                <label for="addressCounty" class="text-sm font-semibold">County</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.address.county_id.$error">
                                    <p v-if="!$v.address.county_id.required">
                                        The county field is required
                                    </p>
                                </div>
                                <select 
                                    id="addressCounty"
                                    name="country"
                                    v-model="address.county_id"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600' : $v.address.county_id.$error, 'border-green-600': $v.address.county_id.$dirty && !$v.address.county_id.$error}"
                                    :disabled="waiting || !hasAddress"
                                    @change="getCitites"
                                    @blur="$v.address.county_id.$touch()"
                                >
                                    <option value="" disabled>Select user country</option>
                                    <option v-for="county in getCounties" :key="county.id" :value="county.id"> {{county.name}} </option>
                                </select>
                            </div>
                            <div class="flex-1">
                                <label for="addressCity" class="text-sm font-semibold">City</label>
                                <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.address.city_id.$error">
                                    <p v-if="!$v.address.city_id.required">
                                        The city field is required
                                    </p>
                                </div>
                                <select 
                                    id="addressCity"
                                    name="city"
                                    v-model="address.city_id"
                                    class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                    :class="{'border-red-600' : $v.address.city_id.$error, 'border-green-600': $v.address.city_id.$dirty && !$v.address.city_id.$error}"
                                    :disabled="citiesSelectState || waiting || !hasAddress"              
                                    @blur="$v.address.city_id.$touch()"
                                >
                                    <option value="" disabled>Select user city</option>
                                    <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option>
                                </select>
                            </div>
                        </div>
                            
                        <div>
                            <label for="addressAddress" class="text-sm font-semibold">Address</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.address.address.$error"> 
                                <p v-if="!$v.address.address.required">
                                    The address field is required
                                </p>
                            </div>
                            <input 
                                id="addressAddress" 
                                name="address"
                                type="text" 
                                v-model="address.address"
                                class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                                :class="{'border-red-600' : $v.address.address.$error, 'border-green-600': $v.address.address.$dirty && !$v.address.address.$error}"
                                :disabled="waiting || !hasAddress"
                                @blur="$v.address.address.$touch()"
                            />
                        </div>
                    </div>
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
    </ViewContainer>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import ViewContainer from '../ViewContainer';
    
    import ImageUploadComponent from '../../components/ImageUploadComponent';

    import { required, email, requiredIf, decimal, maxLength, minValue } from 'vuelidate/lib/validators'

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

                hasAddress: false,

                user: {
                    image: '',
                    first_name: '',
                    name: '',
                    email: '',
                    phone_number: '',
                    birthdate: '',
                    role_id: '',
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

        validations: {
            user: {
                first_name: {
                    required,
                    maxLength: maxLength(50),
                    // alpa spaces
                },
                name: {
                    required,
                    maxLength: maxLength(50),
                    // alpha spaces
                },
                email: {
                    required,
                    email
                },
                phone_number:{
                    required
                    // phonenumber
                },
                birthdate: {
                    required
                },
                role_id: {
                    required
                }
            },
            address: {
                first_name: {
                    required: requiredIf(function () {
                        return this.hasAddress;
                    }),
                    maxLength: maxLength(50),
                    // alpa spaces
                },
                name: {
                    required: requiredIf(function () {
                        return this.hasAddress;
                    }),
                    maxLength: maxLength(50),
                    // alpha spaces
                }, 
                phone_number:{
                   required: requiredIf(function () {
                        return this.hasAddress;
                    }),
                    // phonenumber
                },
                county_id: {
                    required: requiredIf(function () {
                        return this.hasAddress;
                    }),
                },
                city_id: {
                    required: requiredIf(function () {
                        return this.hasAddress;
                    }),
                },
                address: {
                    required: requiredIf(function () {
                        return this.hasAddress;
                    }),
                }
            }
        },

        methods: {
            ...mapActions('Users', ['addUser']),
            ...mapActions('Counties', ['fetchCitites']),

            async submit() {
                this.$v.user.$touch();

                if(this.hasAddress) {
                    this.$v.address.$touch()
                }
                
                if(!this.$v.$invalid) {
                    try {
                        this.$Progress.start()

                        this.waiting = true;
                        const payload = {
                            user: this.user
                        }

                        if(this.hasAddress) {
                            payload.address = this.address
                        }

                        await this.addUser(payload);
                        this.restForm();
                        this.waiting = false;

                        this.$Progress.finish()

                    } catch ( error ) {  
                        this.$Progress.fail();

                        if(error.response && error.response.data.errors) {
                           this.$v.$touch();
                        }  

                        this.waiting = false;
                         
                        console.log(error)
                    }
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
                this.$v.address.$reset()
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