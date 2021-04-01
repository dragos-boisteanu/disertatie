<template>
    <Modal>
        <h1 class="text-3xl my-4">
            Edit user
        </h1>
        <div class="p-1">

            <file-pond
                name="image"
                ref="pond"
                label-idle="Upload new profile image..."
                v-bind:allow-multiple="false"
                accepted-file-types="image/jpeg"
                :server="{
                    url: '/api/dashboard/images',
                    process: { 
                        headers: {
                            'X-CSRF-TOKEN': csrf
                        },
                        onload: (response) =>  addAvatarPathToUser(response) ,
                    },
                    revert: {
                        url: '/delete',
                        headers: {
                            'X-CSRF-TOKEN': csrf
                        },
                    }
                }"
                :files="files"
                :onaddfilestart="waitForFiletoUpload"
                :onprocessfileabort="stopWaitingForFileToUpload"
            />

            <div class="text-right mt-6">
                <button 
                    :disabled="waitForFileUpload"
                    class="border border-gray-600 text-xs text-gray-700 px-4 py-1 rounded hover:border-gray-500 hover:text-gray-600" 
                    @click.prevent="clearAvatar"
                >
                    Clear avatar
                </button>
                <button 
                    v-if="this.user.avatar"
                    :disabled="waitForFileUpload"
                    class="ml-4 border border-gray-600 text-xs text-gray-700 px-4 py-1 rounded hover:border-gray-500 hover:text-gray-600" 
                    @click.prevent="removeAvatar"
                >
                    Remove avatar
                </button>
            </div>

            <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
                <form @submit.prevent="handleSubmit(submit)" class="flex flex-col gap-3">
                    <ValidationProvider vid="first_name" rules="required|alpha_spaces|max:255" v-slot="{ errors }">
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
                    <ValidationProvider vid="name" rules="required|alpha_spaces|max:255" v-slot="{ errors }">
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
                    <ValidationProvider vid="birthdate" rules="required" v-slot="{ errors }">
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
                    <ValidationProvider vid="email" rules="required|email|max:255" v-slot="{ errors }">
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
                    <ValidationProvider vid="phone_number" rules="required|max:255" v-slot="{ errors }">
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
                    <ValidationProvider vid="role_id" rules="required|integer" v-slot="{ errors }" v-if="canChangeRole">
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
                    <div class="w-full flex justify-end items-center mt-4">
                        <button 
                            type="submit"
                            :disabled="waiting || waitForFileUpload"  
                            class="flex items-center bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner  disabled:bg-gray-500 disabled:pointer-events-none"
                        >
                            <svg v-if="waiting" class="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Save
                        </button>
                        <button 
                            @click="close"
                            class="bg-transparent rounded-sm text-xs py-1 px-4 text-black text-bold mt-2 hover:text-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </Modal>
</template>


<script>
    import Modal from '../ModalComponent';
    import {mapActions, mapGetters} from 'vuex'

    import vueFilePond from "vue-filepond";
    import "filepond/dist/filepond.min.css";
    import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
    );

    export default {

        props: {
            user: {
                type: Object,
            }
        },
        
        async mounted() {
            Object.assign(this.localUser, this.user);
        },


        data() {
            return { 
                waitForFileUpload: false,
                waiting: false,
                localUser: {},
                files: [],
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
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

        methods: {
            ...mapActions('Users', ['updateUser']),

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
                        counter = 0;
                        this.close();
                        // notification
                    } else {
                        console.log('Change soemthing before updating the user data.');
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

            waitForFiletoUpload() {
                this.waitForFileUpload = true;
            },

            addAvatarPathToUser(value) {
                this.localUser.avatar = value;
                this.waitForFileUpload = false;
            },

            stopWaitingForFileToUpload() {
                this.waitForFileUpload = false;
            },

            clearAvatar() {
                this.$refs.pond.removeFile({revert: true});
                this.localUser.avatar = this.user.avatar
            },

            async removeAvatar() {
                try {
                    this.$Progress.start();
                    this.$refs.pond.removeFile({revert: true});
                    delete this.localUser.avatar;

                    await this.submit();

                      this.$Progress.finish();
                } catch ( error ) {
                      this.$Progress.fail();
                    console.log(error)
                    // notification
                }
                
               
            },

            close() {
                this.$emit('close');
            }
        },

        components: {
            Modal,
            FilePond
        }
    }
</script>