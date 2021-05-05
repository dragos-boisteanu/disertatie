<template>
    <ViewContainer>
         <template slot="header">
            Edit user #{{user.id}}
        </template>
    
        <form @submit.prevent="submit" class="flex flex-col">
            <div class="flex flex-col lg:items-start xl:w-full 2xl:w-2/5">
                <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1">

                    <!-- IMAGE UPLOAD -->
                    <div class="flex items-center gap-x-5">
                        <div class="w-32 h-32 rounded-md md:mr-4">
                            <img v-if="user.avatar" :src="user.avatar" class="w-full h-full rounded-md object-cover"/>
                            <svg v-else class="bg-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="128px" height="128px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                        </div>

                        <div class="flex-1">
                            <ImageUploadComponent
                                :disabled="waiting || waitForFileUpload"
                                :clear="clearImage"
                                @waitForFileToUpload="toggleWaitForFileUpload"
                                @setImagePath="setImagePath"
                            ></ImageUploadComponent>
                            <button v-if="user.avatar" @click.prevent="removeAvatar">
                                Remove avatar
                            </button>
                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:justify-between md:gap-x-4">
                        <InputGroup
                            id="firstName"
                            label="First name"
                            :hasError="$v.localUser.first_name.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localUser.first_name.required">
                                    The first name field is required
                                </p>
                                <p v-if="!$v.localUser.first_name.maxLength">
                                    The first name field should not be longer than 50 characters
                                </p>
                                <p v-if="!$v.localUser.first_name.alphaSpaces">
                                    The first name field must contain only letters and spaces
                                </p>
                            </template>
                            <Input 
                                v-model="localUser.first_name"
                                id="firstName" 
                                name="first name" 
                                :disabled="waiting"  
                                :class="{'border-red-600' : $v.localUser.first_name.$error, 'border-green-600': $v.localUser.first_name.$dirty && !$v.localUser.first_name.$error}"
                                @blur.native="$v.localUser.first_name.$touch()" 
                            />
                        </InputGroup>
                        <InputGroup
                            id="name"
                            label="Name"
                            :hasError="$v.localUser.name.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                    <p v-if="!$v.localUser.name.required">
                                        The name field is required
                                    </p>    
                                    <p v-if="!$v.localUser.name.maxLength">
                                       The name field should not be longer than 50 characters
                                    </p>
                                    <p v-if="!$v.localUser.name.alphaSpaces">
                                        The name field must contain only letters and spaces
                                    </p>
                                </template>
                            <Input 
                                v-model="localUser.name"
                                id="name" 
                                name="name" 
                                :class="{'border-red-600' : $v.localUser.name.$error, 'border-green-600': $v.localUser.name.$dirty && !$v.localUser.name.$error}"
                                :disabled="waiting"
                                @blur.native="$v.localUser.name.$touch()"
                            />
                        </InputGroup>
                        <InputGroup
                            id="birthdate"
                            label="Birthdate"
                            :hasError="$v.localUser.birthdate.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localUser.birthdate.required">
                                    The birthdate field is required
                                </p>
                            </template>   
                            <date-picker 
                                v-model="localUser.birthdate" 
                                type="date"
                                confirm-text="Ok"
                                valueType="format"
                                :input-class="birthdateClass"
                                :confirm="true"
                                :disabled="waiting"
                                @input.native="$v.localUser.birthdate.$touch()"
                            ></date-picker>
                        </InputGroup>
                        
                    </div>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:gap-x-4">
                        <InputGroup
                            id="email"
                            label="Email"
                            :hasError="$v.localUser.email.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localUser.email.required">
                                    The email field is required
                                </p>
                                <p v-if="!$v.localUser.email.email">
                                    The email field must have valid email
                                </p>
                            </template>
                            <Input 
                                v-model="localUser.email"
                                id="email" 
                                name="email"   
                                :class="{'border-red-600' : $v.localUser.email.$error, 'border-green-600': $v.localUser.email.$dirty && !$v.localUser.email.$error}"
                                :disabled="waiting"
                                @blur.native="$v.localUser.email.$touch()"
                            />
                        </InputGroup>
                        <InputGroup
                            id="phoneNumber"
                            label="Phone number"
                            :hasError="$v.localUser.phone_number.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localUser.phone_number.required">
                                    The phone number field is required
                                </p>
                                <p v-if="!$v.localUser.phone_number.phoneNumber">
                                    The phone number is invalid
                                </p>
                            </template>
                            <Input 
                                v-model="localUser.phone_number"
                                id="phone" 
                                name="phone number" 
                                :class="{'border-red-600' : $v.localUser.phone_number.$error, 'border-green-600': $v.localUser.phone_number.$dirty && !$v.localUser.phone_number.$error}"
                                :disabled="waiting" 
                                @blur="$v.localUser.phone_number.$touch()"
                            />
                        </InputGroup>
                    </div>
                    <InputGroup
                        id="roleId"
                        label="Role"
                        :hasError="$v.localUser.phone_number.$error"
                    >
                         <template v-slot:errors>
                            <p v-if="!$v.localUser.role_id.required">
                                The role field is required
                            </p>
                        </template>
                        <Select 
                            v-model="localUser.role_id"
                            id="role" 
                            name="role"
                            :class="{'border-red-600' : $v.localUser.role_id.$error, 'border-green-600': $v.localUser.role_id.$dirty && !$v.localUser.role_id.$error}"
                            :disabled="waiting"
                            @blur.native="$v.localUser.role_id.$touch()"   
                        >
                            <option v-for="role in getRoles" :key="role.id" :value="role.id">{{role.name}}</option>
                        </Select>
                    </InputGroup>
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
            </div>
        </form>          
    </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer'
    import ImageUploadComponent from '../../components/ImageUploadComponent'

    import Input from '../../components/inputs/TextInputComponent';
    import InputGroup from '../../components/inputs/InputGroupComponent';
    import Select from '../../components/inputs/SelectInputComponent';
    import Button from '../../components/buttons/ButtonComponent';

    import DatePicker from 'vue2-datepicker';

    import store from '../../store/index';
    import { mapGetters, mapActions } from 'vuex';

    import { required, email, maxLength, } from 'vuelidate/lib/validators'
    import { alphaSpaces, phoneNumber } from '../../validators/index';


    export default {

        async beforeRouteEnter (to, from, next) {
            const id = to.params.id;
            try{
                if(store.getters['Users/getUsers'].length > 0) {
                    const user = await store.dispatch('Users/getUser', id);
                    next(vm => vm.setUser(user));
                } else {
                    const user = await store.dispatch('Users/fetchUser', id);
                    next(vm => vm.setUser(user));
                }
            } catch(error) {
                store.dispatch('Notification/openNotification', {
                    type: 'err',
                    show: true,
                    message: 'Something wrong happened'
                })
            }
        },

        computed: {
           ...mapGetters('Roles', ['getRoles']),
           ...mapGetters('Users', ['getLoggedUser']),

            canChangeRole() {
                //  TO DO: hide roles list if the auth user's role is 6 and the local user role is 6 or 7
               return [6,7].includes(this.getLoggedUser.role_id)
            },

            birthdateClass() {
                let customClass = "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500";
                if(this.$v.localUser.birthdate.$error) {
                    customClass = customClass.concat(' ', 'border-red-600')
                } else if (this.$v.localUser.birthdate.$dirty && !this.$v.localUser.birthdate.$error) {
                    customClass = customClass.concat(' ', 'border-green-600');
                }
                return customClass;
            }
        },

        data() {
            return {
                clearImage: false,

                waiting: false,
                waitForFileUpload: false,

                user: {},
                localUser: {
                    id: '',
                    first_name: '',
                    name: '',
                    birthdate: '',
                    email: '',
                    phone_number: '',
                    role_id: ''
                },              

            }
        },

        validations: {
            localUser: {
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
                    phoneNumber
                },
                birthdate: {
                    required
                },
                role_id: {
                    required
                }
            },
        },

        methods: {
            ...mapActions('Users', ['updateUser']),
            ...mapActions('Notification', ['openNotification']),

            async submit() {

                this.$v.$touch();

                if(!this.$v.$invalid) {
                    try {
                        this.$Progress.start()

                        this.waiting = true;
                        const payload = {
                            vm: this,
                            user: {
                                id: this.user.id
                            }
                        };

                        let counter = 0;

                        Object.keys(this.user).forEach(key => {
                            if(this.localUser[key] != this.user[key]) {
                                payload.user[key] = this.localUser[key];
                                counter++;
                            }
                        })

                        if(counter > 0) {
                            const response = await this.updateUser(payload);

                            payload.user.avatar = response.data.avatar;

                            this.$emit('updated', payload.user);

                            this.$router.push({name: 'User', params: {id: this.user.id}});

                            this.openNotification({
                                type: 'ok',
                                show: true,
                                message: 'User account updated'
                            })
                        } else {
                            this.openNotification({
                                type: 'info',
                                show: true,
                                message: 'Nothing to update'
                            })
                        }

                        this.$Progress.finish()

                        this.waiting = false;

                    } catch ( error ) {
                        this.$v.$touch();
                        this.$Progress.fail();
                        if(error.response.data.errors) {
                            this.$refs.observer.setErrors(error.response.data.errors)
                        } 
                        this.waiting = false;
                        console.log(error);
                        // notification
                    }
                }
                
            },

            removeAvatar() {
                this.user.avatar = "";
                this.localUser.avatar = "clear";
            },

            toggleWaitForFileUpload(waitForFileToUpload) {
                console.log(waitForFileToUpload);
                this.waitForFileUpload = waitForFileToUpload;
            },

            setImagePath(imagePath) {
                console.log(imagePath)
                this.localUser.avatar = imagePath;
            },

            setUser(user) {
                this.user = user;
                this.localUser = JSON.parse(JSON.stringify(this.user))

            }
        },


        components: {
            ViewContainer,
            ImageUploadComponent,
            Input,
            InputGroup,
            Select,
            Button,
            DatePicker
        }
    }

</script>