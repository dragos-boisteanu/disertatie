<template>
    <ViewContainer>
        <template slot="header">
            Create user account
        </template>

        <form class="flex flex-col">
            <div class="flex flex-col lg:items-start lg:flex-row lg:gap-x-6 lg:w-full 2xl:w-10/12">
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
                        <InputGroup
                            id="firstName"
                            label="First name"
                            :hasError="$v.user.first_name.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.user.first_name.required">
                                    The first name field is required
                                </p>
                                <p v-if="!$v.user.first_name.maxLength">
                                    The first name field should not be longer than 50 characters
                                </p>
                                <p v-if="!$v.user.first_name.alphaSpaces">
                                    The first name field must contain only letters and spaces
                                </p>
                            </template>
                            <Input 
                                v-model="user.first_name"
                                id="firstName"
                                name="firstName" 
                                :disabled="waiting"  
                                :class="{'border-red-600' : $v.user.first_name.$error, 'border-green-600': $v.user.first_name.$dirty && !$v.user.first_name.$error}"
                                @blur.native="$v.user.first_name.$touch()"
                            />
                        </InputGroup>
                        <InputGroup
                            id="name"
                            label="Name"
                            :hasError="$v.user.name.$error"
                            :class="{'flex-1':true}"
                        > 
                            <template v-slot:errors>
                                <p v-if="!$v.user.name.required">
                                    The name field is required
                                </p>    
                                <p v-if="!$v.user.name.maxLength">
                                    The name field should not be longer than 50 characters
                                </p>
                                <p v-if="!$v.user.name.alphaSpaces">
                                    The name field must contain only letters and spaces
                                </p>
                            </template>
                            <Input 
                                v-model="user.name" 
                                id="name" 
                                type="text"       
                                :class="{'border-red-600' : $v.user.name.$error, 'border-green-600': $v.user.name.$dirty && !$v.user.name.$error}"
                                :disabled="waiting"
                                @blur.native="$v.user.name.$touch()"
                            />
                        </InputGroup>
                        <InputGroup
                            id="birthdate"
                            label="Birthdate"
                            :hasError="$v.user.birthdate.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.user.birthdate.required">
                                    The birthdate field is required
                                </p>
                            </template>
                            <date-picker 
                                v-model="user.birthdate" 
                                type="date"
                                confirm-text="Ok"
                                valueType="format"
                                :input-class="birthdateClass"
                                :confirm="true"
                                :disabled="waiting"
                                @input.native="$v.user.birthdate.$touch()"
                            ></date-picker>
                        </InputGroup>
                    </div>
                    
                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:gap-x-4">
                        <InputGroup
                            id="email"
                            label="Email"
                            :hasError="$v.user.email.$error"
                            :eclass="{'felx-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.user.email.required">
                                    The email field is required
                                </p>
                                <p v-if="!$v.user.email.email">
                                    The email field must have valid email
                                </p>
                            </template>
                            <Input 
                                v-model="user.email" 
                                id="email"
                                name="email"
                                :class="{'border-red-600' : $v.user.email.$error, 'border-green-600': $v.user.email.$dirty && !$v.user.email.$error}"
                                :disabled="waiting"
                                @blur.native="$v.user.email.$touch()"
                            />
                        </InputGroup>
                        <InputGroup 
                            id="phoneNumber"
                            label="Phone number"
                            :hasError="$v.user.phone_number.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.user.phone_number.required">
                                    The phone number field is required
                                </p>
                                <p v-if="!$v.user.phone_number.phoneNumber">
                                    The phone number is invalid
                                </p>
                            </template>
                            <Input 
                                v-model="user.phone_number"
                                id="phoneNumber"
                                name="phoneNumber"        
                                :class="{'border-red-600' : $v.user.phone_number.$error, 'border-green-600': $v.user.phone_number.$dirty && !$v.user.phone_number.$error}"
                                :disabled="waiting" 
                                @blur.native="$v.user.phone_number.$touch()"
                            />
                        </InputGroup>
                    </div>
                    
                    <InputGroup
                        id="role"
                        label="Role"
                        :hasError="$v.user.role_id.$error"
                    >
                        <template v-slot:errors>
                            <p v-if="!$v.user.role_id.required">
                                The role field is required
                            </p>
                        </template>
                        <Select                         
                            v-model="user.role_id" 
                            id="role"
                            name="role"   
                            :class="{'border-red-600' : $v.user.role_id.$error, 'border-green-600': $v.user.role_id.$dirty && !$v.user.role_id.$error}"
                            :disabled="waiting"
                            @blur.native="$v.user.role_id.$touch()"
                        >   
                            <option value="" selected disabled>Select role</option>
                            <option v-for="role in availableRoles" :key="role.id" :value="role.id">{{role.name}}</option>
                        </Select>
                    </InputGroup>
                </div>

                <div class="mt-5 flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 border-b border-gray-200 lg:mt-0 lg:border-r lg:pr-5 lg:border-b-0 lg:flex-1">
                    <h2 class="mb-5 text-xl font-semibold">
                        <input id="addressToggle" type="checkbox" v-model="hasAddress" @click="toggleAddressState"> 
                        <label for="addressToggle">Address (optional)</label>
                    </h2>

                    <div ref="addressForm" class="flex flex-col gap-y-4"> 
                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">                  
                            <InputGroup
                                id="addressFirstName"
                                label="First name"
                                :hasError="$v.address.first_name.$error"
                                :eclass="{'flex-1':true}"
                            >
                                <template v-slot:errors>
                                    <p v-if="!$v.address.first_name.required">
                                        The first name field is required
                                    </p>
                                    <p v-if="!$v.address.first_name.maxLength">
                                        The first name field should not be longer than 50 characters
                                    </p>
                                    <p v-if="!$v.address.first_name.alphaSpaces">
                                        The first name field must contain only letters and spaces
                                    </p>
                                </template>
                                <Input 
                                    v-model="address.first_name"
                                    id="addressFirstName" 
                                    name="firstName"  
                                    :class="{'border-red-600' : $v.address.first_name.$error, 'border-green-600': $v.address.first_name.$dirty && !$v.address.first_name.$error}"
                                    :disabled="waiting || !hasAddress"  
                                    @blur.native="$v.address.first_name.$touch()"
                                />
                            </InputGroup>      
                            <InputGroup
                                id="addressName"
                                label="Name"
                                :hasError="$v.address.name.$error"
                                :eclass="{'flex-1':true}"
                            >
                                <template v-slot:errors >
                                    <p v-if="!$v.address.name.required">
                                        The name field is required
                                    </p>
                                    <p v-if="!$v.address.name.maxLength">
                                        The first name field shound not be longer than 50 characters
                                    </p>
                                    <p v-if="!$v.address.name.alphaSpaces">
                                        The  name field must contain only letters and spaces
                                    </p>
                                </template>
                                <Input 
                                    v-model="address.name"
                                    id="addressName" 
                                    name="name"
                                    :class="{'border-red-600' : $v.address.name.$error, 'border-green-600': $v.address.name.$dirty && !$v.address.name.$error}"
                                    :disabled="waiting || !hasAddress"   
                                    @blur.native="$v.address.name.$touch()"
                                />
                            </InputGroup>
                            <InputGroup
                                id="addressPhoneNumber"
                                label="Phone number"
                                :hasError="$v.address.phone_number.$error"
                                :eclass="{'flex-1':true}"
                             >
                                <template v-slot:errors>
                                    <p v-if="!$v.address.phone_number.required">
                                        The phone number field is required
                                    </p>
                                    <p v-if="!$v.user.phone_number.phoneNumber">
                                        The phone number is invalid
                                    </p>
                                </template>
                                <Input 
                                    v-model="address.phone_number" 
                                    id="addressPhoneNumber" 
                                    name="phone number" 
                                    :class="{'border-red-600' : $v.address.phone_number.$error, 'border-green-600': $v.address.phone_number.$dirty && !$v.address.phone_number.$error}"
                                    :disabled="waiting || !hasAddress" 
                                    @blur.native="$v.address.phone_number.$touch()"
                                />
                            </InputGroup>
                        </div>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">                  
                            <InputGroup
                                id="addresCounty"
                                label="County"
                                :hasError="$v.address.county_id.$error"
                                :eclass="{'flex-1':true}"
                            >  
                                <template v-slot:errors>
                                    <p v-if="!$v.address.county_id.required">
                                        The county field is required
                                    </p>
                                </template>
                                <Select 
                                    v-model="address.county_id"
                                    id="addressCounty"
                                    name="country"
                                    :class="{'border-red-600' : $v.address.county_id.$error, 'border-green-600': $v.address.county_id.$dirty && !$v.address.county_id.$error}"
                                    :disabled="waiting || !hasAddress"
                                    @change.native="getCitites"
                                    @blur.native="$v.address.county_id.$touch()"
                                >
                                    <option value="" disabled>Select user country</option>
                                    <option v-for="county in getCounties" :key="county.id" :value="county.id"> {{county.name}} </option>
                                </Select>
                            </InputGroup>
                            <InputGroup
                                id="addresCity"
                                label="City"
                                :hasError="$v.address.city_id.$error"
                                :eclass="{'flex-1':true}"
                            >
                                <template v-slot:errors>
                                    <p v-if="!$v.address.city_id.required">
                                        The city field is required
                                    </p>
                                </template>
                                <Select 
                                    v-model="address.city_id"
                                    id="addressCity"
                                    name="city"
                                    :class="{'border-red-600' : $v.address.city_id.$error, 'border-green-600': $v.address.city_id.$dirty && !$v.address.city_id.$error}"
                                    :disabled="citiesSelectState || waiting || !hasAddress"              
                                    @blur.native="$v.address.city_id.$touch()"
                                >
                                    <option value="" disabled>Select user city</option>
                                    <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option>
                                </Select>
                            </InputGroup>
                        </div>
                            
                        <InputGroup
                            id="addressAddress"
                            label="Address"
                            :hasError="$v.address.address.$error"
                        >
                            <template v-slot:errors> 
                                <p v-if="!$v.address.address.required">
                                    The address field is required
                                </p>
                                <p v-if="!$v.address.address.alphaNumSpaces">
                                    The address field must contain only letters, numbers and spaces
                                </p>
                            </template>
                            <Input 
                                v-model="address.address"
                                id="addressAddress" 
                                name="address" 
                                :class="{'border-red-600' : $v.address.address.$error, 'border-green-600': $v.address.address.$dirty && !$v.address.address.$error}"
                                :disabled="waiting || !hasAddress"
                                @blur.native="$v.address.address.$touch()"
                            />
                        </InputGroup>
                    </div>
                </div>
            </div>

            <div class="mt-5 flex md:justify-start">
                <Button 
                    type="primary"
                    :disabled="waiting || waitForFileUpload"  
                    :waiting="waiting"
                    @click.native.prevent="submit"
                >
                    Submit
                </Button>
            </div>
        </form>
    </ViewContainer>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import ViewContainer from '../ViewContainer';
    
    import ImageUploadComponent from '../../components/ImageUploadComponent';

    import Input from '../../components/inputs/TextInputComponent';
    import InputGroup from '../../components/inputs/InputGroupComponent';
    import Select from '../../components/inputs/SelectInputComponent';
    import Button from '../../components/buttons/ButtonComponent';
    
    import DatePicker from 'vue2-datepicker';

    import { required, email, requiredIf, maxLength, } from 'vuelidate/lib/validators'
    import { alphaSpaces, alphaNumSpaces, phoneNumber } from '../../validators/index';

    import { downloadRoles } from "../../api/roles.api";

    export default {

        async mounted() {
            const response = await downloadRoles({available:true});
            this.availableRoles = response.data.data.roles;
        },

        computed: {
            ...mapGetters('Counties', ['getCounties']),

            citiesSelectState() {
                return this.address.county_id ? false : true;
            },

            birthdateClass() {
                let customClass = "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500";
                if(this.$v.user.birthdate.$error) {
                    customClass = customClass.concat(' ', 'border-red-600')
                } else if (this.$v.user.birthdate.$dirty && !this.$v.user.birthdate.$error) {
                    customClass = customClass.concat(' ', 'border-green-600');
                }
                return customClass;
            }
        },

        data() {
            return {
                availableRoles: [],

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
                    alphaSpaces
                },
                name: {
                    required,
                    maxLength: maxLength(50),
                    alphaSpaces
                },
                email: {
                    required,
                    email
                },
                phone_number:{
                    required,
                    // phoneNumber
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
                    alphaSpaces
                },
                name: {
                    required: requiredIf(function () {
                        return this.hasAddress;
                    }),
                    maxLength: maxLength(50),
                    alphaSpaces
                }, 
                phone_number:{
                   required: requiredIf(function () {
                        return this.hasAddress;
                    }),
                    phoneNumber
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
                    alphaNumSpaces
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
                this.$v.$reset();
                
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
            ImageUploadComponent,
            Input,
            Select,
            InputGroup,
            Button,
            DatePicker
        }
    }
</script>