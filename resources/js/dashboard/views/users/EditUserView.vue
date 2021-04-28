<template>
    <ViewContainer>
         <template slot="header">
            Edit user #{{user.id}}
        </template>
    
        <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
            <form @submit.prevent="handleSubmit(submit)" class="flex flex-col">
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
                            <ValidationProvider 
                                vid="first_name" 
                                rules="required|alpha_spaces|max:255" 
                                v-slot="{ errors }"
                                class="flex-1"
                            >
                                <div>
                                    <label for="firstName" class="text-sm font-semibold">First name</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="firstName" 
                                        name="first name"
                                        type="text" 
                                        v-model="localUser.first_name"
                                        :disabled="waiting"
                                        class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                        :class="{'border-red-600': errors[0]}" 
                                    />
                                </div>
                            </ValidationProvider>
                            <ValidationProvider 
                                vid="name" 
                                rules="required|alpha_spaces|max:255" 
                                v-slot="{ errors }"
                                class="flex-1"
                            >
                                <div>
                                    <label for="name" class="text-sm font-semibold">Name</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="name" 
                                        name="name"
                                        type="text" 
                                        v-model="localUser.name"
                                        :disabled="waiting"
                                        class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                        :class="{'border-red-600': errors[0]}" 
                                    />
                                </div>
                            </ValidationProvider>
                            <ValidationProvider 
                                vid="birthdate" 
                                rules="required" 
                                v-slot="{ errors }"
                                class="flex-1"
                            >
                                <div>
                                    <label for="birthdate" class="text-sm font-semibold">Birthdate</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="birthdate" 
                                        name="birthdate"
                                        type="date" 
                                        v-model="localUser.birthdate"
                                        :disabled="waiting"
                                        class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                        :class="{'border-red-600': errors[0]}" 
                                    />
                                </div>
                            </ValidationProvider>
                            
                        </div>

                        <div class="flex flex-col gap-y-4 md:flex md:flex-row md:items-center md:gap-x-4">
                            <ValidationProvider 
                                vid="email" 
                                rules="required|email|max:255" 
                                v-slot="{ errors }"
                                class="flex-1"
                            >
                                <div>
                                    <label for="email" class="text-sm font-semibold">Email</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="email" 
                                        name="email"
                                        type="email" 
                                        v-model="localUser.email"
                                        :disabled="waiting"
                                        class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                        :class="{'border-red-600': errors[0]}" 
                                    />
                                </div>
                            </ValidationProvider>
                            <ValidationProvider 
                                vid="phone_number" 
                                rules="required|max:255" 
                                v-slot="{ errors }"
                                class="flex-1"
                            >
                                <div>
                                    <label for="phone" class="text-sm font-semibold">Phone number</label>
                                    <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                    <input 
                                        id="phone" 
                                        name="phone number"
                                        type="text" 
                                        v-model="localUser.phone_number"
                                        :disabled="waiting"
                                        class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                        :class="{'border-red-600': errors[0]}" 
                                    />
                                </div>
                            </ValidationProvider>
                        </div>

                        <ValidationProvider 
                            vid="role_id" 
                            rules="required|integer" 
                            v-slot="{ errors }" v-if="canChangeRole"
                        >
                            <div>
                                <label for="role" class="text-sm font-semibold">Role</label>
                                <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                                <select 
                                    id="role" 
                                    name="role"
                                    v-model="localUser.role_id"
                                    :disabled="waiting"
                                    class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                    :class="{'border-red-600': errors[0]}"   
                                >
                                    <option v-for="role in getRoles" :key="role.id" :value="role.id">{{role.name}}</option>
                                </select>
                            </div>
                        </ValidationProvider>
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
        </ValidationObserver>    
    </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer'
    import ImageUploadComponent from '../../components/ImageUploadComponent'
    import store from '../../store/index';
    import { mapGetters, mapActions } from 'vuex';


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

        methods: {
            ...mapActions('Users', ['updateUser']),
            ...mapActions('Notification', ['openNotification']),

            async submit() {
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
                    this.$Progress.fail();
                    if(error.response.data.errors) {
                        this.$refs.observer.setErrors(error.response.data.errors)
                    } 
                    this.waiting = false;
                    console.log(error);
                    // notification
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