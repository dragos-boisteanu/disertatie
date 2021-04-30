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
                        <div class="flex-1">
                            <label for="firstName" class="text-sm font-semibold">First name</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localUser.first_name.$error">
                                <p v-if="!$v.localUser.first_name.required">
                                    The first name field is required
                                </p>
                                <p v-if="!$v.localUser.first_name.maxLength">
                                    The first name field should not be longer than 50 characters
                                </p>
                                <p v-if="!$v.localUser.first_name.alphaSpaces">
                                    The first name field must contain only letters and spaces
                                </p>
                            </div>
                            <input 
                                id="firstName" 
                                name="first name"
                                type="text" 
                                v-model="localUser.first_name"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :disabled="waiting"  
                                :class="{'border-red-600' : $v.localUser.first_name.$error, 'border-green-600': $v.localUser.first_name.$dirty && !$v.localUser.first_name.$error}"
                                @blur="$v.localUser.first_name.$touch()" 
                            />
                        </div>
                        <div class="flex-1">
                            <label for="name" class="text-sm font-semibold">Name</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localUser.name.$error">
                                    <p v-if="!$v.localUser.name.required">
                                        The name field is required
                                    </p>    
                                    <p v-if="!$v.localUser.name.maxLength">
                                       The name field should not be longer than 50 characters
                                    </p>
                                    <p v-if="!$v.localUser.name.alphaSpaces">
                                        The name field must contain only letters and spaces
                                    </p>
                                </div>
                            <input 
                                id="name" 
                                name="name"
                                type="text" 
                                v-model="localUser.name"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600' : $v.localUser.name.$error, 'border-green-600': $v.localUser.name.$dirty && !$v.localUser.name.$error}"
                                :disabled="waiting"
                                @blur="$v.localUser.name.$touch()"
                            />
                        </div>
                        <div class="flex-1">
                            <label for="birthdate" class="text-sm font-semibold">Birthdate</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localUser.birthdate.$error">
                                <p v-if="!$v.localUser.birthdate.required">
                                    The birthdate field is required
                                </p>
                            </div>                            
                            <input 
                                id="birthdate" 
                                name="birthdate"
                                type="date" 
                                v-model="localUser.birthdate"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600' : $v.localUser.birthdate.$error, 'border-green-600': $v.localUser.birthdate.$dirty && !$v.localUser.birthdate.$error}"
                                :disabled="waiting"
                                @blur="$v.localUser.birthdate.$touch()"
                            />
                        </div>
                        
                    </div>

                    <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:gap-x-4">
                        <div class="flex-1">
                            <label for="email" class="text-sm font-semibold">Email</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localUser.email.$error">
                                <p v-if="!$v.localUser.email.required">
                                    The email field is required
                                </p>
                                <p v-if="!$v.localUser.email.email">
                                    The email field must have valid email
                                </p>
                            </div>
                            <input 
                                id="email" 
                                name="email"
                                type="email" 
                                v-model="localUser.email"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600' : $v.localUser.email.$error, 'border-green-600': $v.localUser.email.$dirty && !$v.localUser.email.$error}"
                                :disabled="waiting"
                                @blur="$v.localUser.email.$touch()"
                            />
                        </div>
                        <div class="flex-1">
                            <label for="phone" class="text-sm font-semibold">Phone number</label>
                            <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localUser.phone_number.$error">
                                <p v-if="!$v.localUser.phone_number.required">
                                    The phone number field is required
                                </p>
                                <p v-if="!$v.localUser.phone_number.phoneNumber">
                                    The phone number is invalid
                                </p>
                            </div>
                            <input 
                                id="phone" 
                                name="phone number"
                                type="text" 
                                v-model="localUser.phone_number"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600' : $v.localUser.phone_number.$error, 'border-green-600': $v.localUser.phone_number.$dirty && !$v.localUser.phone_number.$error}"
                                :disabled="waiting" 
                                @blur="$v.localUser.phone_number.$touch()"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="role" class="text-sm font-semibold">Role</label>
                         <div class="text-xs text-red-600 font-semibold mb-1" v-if="$v.localUser.role_id.$error">
                            <p v-if="!$v.localUser.role_id.required">
                                The role field is required
                            </p>
                        </div>
                        <select 
                            id="role" 
                            name="role"
                            v-model="localUser.role_id"
                            class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                            :class="{'border-red-600' : $v.localUser.role_id.$error, 'border-green-600': $v.localUser.role_id.$dirty && !$v.localUser.role_id.$error}"
                            :disabled="waiting"
                            @blur="$v.localUser.role_id.$touch()"   
                        >
                            <option v-for="role in getRoles" :key="role.id" :value="role.id">{{role.name}}</option>
                        </select>
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
            </div>
        </form>          
    </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer'
    import ImageUploadComponent from '../../components/ImageUploadComponent'
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
            }
        },

        data() {
            return {
                clearImage: false,

                waiting: false,
                waitForFileUpload: false,

                user: {},
                localUser: {},              

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
            ImageUploadComponent
        }
    }

</script>