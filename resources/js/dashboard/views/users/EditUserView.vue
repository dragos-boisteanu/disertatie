<template>
    <ViewContainer>
        <template slot="header">
            Edit user #{{user.id}}
        </template>
    
        <form @submit.prevent="submit" class="flex flex-col">
           <div class="flex flex-col lg:items-start lg:w-full 2xl:w-10/12">
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
                            :hasError="$v.localUser.firstName.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localUser.firstName.required">
                                    The first name field is required
                                </p>
                                <p v-if="!$v.localUser.firstName.maxLength">
                                    The first name field should not be longer than 50 characters
                                </p>
                                <p v-if="!$v.localUser.firstName.alphaSpaces">
                                    The first name field must contain only letters and spaces
                                </p>
                            </template>
                            <Input 
                                v-model="localUser.firstName"
                                id="firstName" 
                                name="first name" 
                                :disabled="waiting"  
                                :class="{'border-red-600' : $v.localUser.firstName.$error, 'border-green-600': $v.localUser.firstName.$dirty && !$v.localUser.firstName.$error}"
                                @blur.native="$v.localUser.firstName.$touch()" 
                            />
                        </InputGroup>
                        <InputGroup
                            id="lastName"
                            label="Last name"
                            :hasError="$v.localUser.lastName.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                    <p v-if="!$v.localUser.lastName.required">
                                        The last name field is required
                                    </p>    
                                    <p v-if="!$v.localUser.lastName.maxLength">
                                       The last name field should not be longer than 50 characters
                                    </p>
                                    <p v-if="!$v.localUser.lastName.alphaSpaces">
                                        The last name field must contain only letters and spaces
                                    </p>
                                </template>
                            <Input 
                                v-model="localUser.lastName"
                                id="lastName" 
                                name="lastName" 
                                :class="{'border-red-600' : $v.localUser.lastName.$error, 'border-green-600': $v.localUser.lastName.$dirty && !$v.localUser.lastName.$error}"
                                :disabled="waiting"
                                @blur.native="$v.localUser.lastName.$touch()"
                            />
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
                            :hasError="$v.localUser.phoneNumber.$error"
                            :eclass="{'flex-1':true}"
                        >
                            <template v-slot:errors>
                                <p v-if="!$v.localUser.phoneNumber.required">
                                    The phone number field is required
                                </p>
                                <p v-if="!$v.localUser.phoneNumber.phoneNumber">
                                    The phone number is invalid
                                </p>
                            </template>
                            <Input 
                                v-model="localUser.phoneNumber"
                                id="phone" 
                                name="phone number" 
                                :class="{'border-red-600' : $v.localUser.phoneNumber.$error, 'border-green-600': $v.localUser.phoneNumber.$dirty && !$v.localUser.phoneNumber.$error}"
                                :disabled="waiting" 
                                @blur="$v.localUser.phoneNumber.$touch()"
                            />
                        </InputGroup>
                    </div>
                    <InputGroup
                        id="roleId"
                        label="Role"
                        :hasError="$v.localUser.phoneNumber.$error"
                    >
                         <template v-slot:errors>
                            <p v-if="!$v.localUser.role.id.required">
                                The role field is required
                            </p>
                        </template>
                        <Select 
                            v-model="localUser.role.id"
                            id="role" 
                            name="role"
                            :class="{'border-red-600' : $v.localUser.role.id.$error, 'border-green-600': $v.localUser.role.id.$dirty && !$v.localUser.role.id.$error}"
                            :disabled="waiting || disableRoleChange"
                            @blur.native="$v.localUser.role.id.$touch()"   
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

    import { mapActions, mapGetters } from 'vuex';

    import { required, email, maxLength, } from 'vuelidate/lib/validators'
    import { alphaSpaces, phoneNumber } from '../../validators/index';

    import { downloadUser, patchUser } from '../../api/users.api';

    import _isEqual from 'lodash/isEqual';
    
    export default {

        async beforeRouteEnter (to, from, next) {
            const response = await downloadUser(to.params.id);
            next(vm => vm.setUser(response.data.data));
        },

        computed: {
            ...mapGetters('Roles', ['getRoles']),
            ...mapGetters('Users', ["isAdmin", "isLocationManager"]),

            disableRoleChange() {
                return !(this.isAdmin || this.isLocationManager)
            },
        },

        data() {
            return {
                clearImage: false,

                waiting: false,
                waitForFileUpload: false,

                user: {},
                localUser: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    role: {
                        id: '',
                        name: ''
                    }
                },              

            }
        },

        validations: {
            localUser: {
                firstName: {
                    required,
                    maxLength: maxLength(50),
                    alphaSpaces
                },
                lastName: {
                    required,
                    maxLength: maxLength(50),
                    alphaSpaces
                },
                email: {
                    required,
                    email
                },
                phoneNumber:{
                    required,
                    // phoneNumber
                },
                role: {
                    id: {
                        required
                    }
                }
            },
        },

        methods: {
            ...mapActions('Notification', ['openNotification']),

            async submit() {

                this.$v.$touch();

                if(!this.$v.$invalid) {
                    try {
                        this.waiting = true;

                        const payload = {
                            user: {
                                id: this.user.id
                            }
                        };

                        let counter = 0;

                        Object.keys(this.user).forEach(key => {
                            if(!_isEqual(this.localUser[key], this.user[key])) {
                                payload.user[key] = this.localUser[key];
                                counter++;
                            }
                        })

                        if(counter > 0) {

                            const response = await patchUser(payload.user);

                            payload.user.avatar = response.data.avatar;

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

                        this.waiting = false;

                    } catch ( error ) {
                        console.log(error)
                        this.$v.$touch();
                        this.waiting = false;
                        this.openNotification({
                            type: 'err',
                            show: true,
                            message: 'Failed to update user account'
                        })
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