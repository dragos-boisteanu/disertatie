<template>
    <Modal>
        <h1 class="text-3xl my-4">
            Edit user
        </h1>
        <div class="p-1">
            <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
                <form @submit.prevent="handleSubmit(submit)" class="flex flex-col gap-3">
                    <ValidationProvider vid="" rules="required|alpha_spaces|max:255" v-slot="{ errors }">
                        <div>
                            <label for="firstName" class="text-sm font-semibold">First name</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <input 
                                id="firstName" 
                                name="first name"
                                type="text" 
                                v-model="localUser.firstName"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600': errors[0]}" 
                            />
                        </div>
                    </ValidationProvider>
                    <ValidationProvider vid="" rules="required|alpha_spaces|max:255" v-slot="{ errors }">
                        <div>
                            <label for="name" class="text-sm font-semibold">Name</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <input 
                                id="name" 
                                name="name"
                                type="text" 
                                v-model="localUser.name"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600': errors[0]}" 
                            />
                        </div>
                    </ValidationProvider>
                    <ValidationProvider vid="" rules="required" v-slot="{ errors }">
                        <div>
                            <label for="birthdate" class="text-sm font-semibold">Birthdate</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <input 
                                id="birthdate" 
                                name="birthdate"
                                type="date" 
                                v-model="localUser.birthdate"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600': errors[0]}" 
                            />
                        </div>
                    </ValidationProvider>
                    <ValidationProvider vid="" rules="required|email|max:255" v-slot="{ errors }">
                        <div>
                            <label for="email" class="text-sm font-semibold">Email</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <input 
                                id="email" 
                                name="email"
                                type="email" 
                                v-model="localUser.email"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600': errors[0]}" 
                            />
                        </div>
                    </ValidationProvider>
                    <ValidationProvider vid="" rules="required|max:255" v-slot="{ errors }">
                        <div>
                            <label for="phone" class="text-sm font-semibold">Phone number</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <input 
                                id="phone" 
                                name="phone number"
                                type="text" 
                                v-model="localUser.phoneNumber"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600': errors[0]}" 
                            />
                        </div>
                    </ValidationProvider>
                    <ValidationProvider vid="" rules="required|integer" v-slot="{ errors }">
                        <div>
                            <label for="role" class="text-sm font-semibold">Role</label>
                            <div class="text-xs text-red-600 font-semibold mb-1"> {{ errors[0] }}</div>
                            <select 
                                id="role" 
                                name="role"
                                v-model="localUser.roleId"
                                class="w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"   
                                :class="{'border-red-600': errors[0]}"   
                            >
                                <option v-for="role in getRoles" :key="role.id" :value="role.id">{{role.name}}</option>
                            </select>
                        </div>
                    </ValidationProvider>
                </form>
            </ValidationObserver>
            <div class="w-full text-right">
                <button 
                    class="bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner"
                    @click="update"
                >
                    Save
                </button>
                <button 
                    @click="close"
                    class="bg-transparent rounded-sm text-xs py-1 px-4 text-black text-bold mt-2 hover:text-gray-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    </Modal>
</template>


<script>
    import Modal from '../ModalComponent';
    import {mapActions, mapGetters} from 'vuex'

    export default {

        props: {
            user: {
                type: Object,
                required: true
            }
        },
        
        mounted() {
            Object.assign(this.localUser, this.user);
        },


        data() {
            return { 
                localUser: {}
            }
        },

        computed: {
           ...mapGetters('Roles', ['getRoles']),
            
        },

        methods: {
            ...mapActions('Users', ['updateUser']),
            async update() {
                try {
                    const payload = {
                        vm: this,
                        user: {}
                    };
                    let counter = 0;
                    Object.keys(this.user).forEach(key => {
                        if(this.localUser[key] != this.user[key]) {
                            payload.user[key] = this.localUser[key];
                            counter++;
                        }
                    })

                    if(counter > 0) {
                        console.log(payload);
                        counter = 0;
                    } else {
                        console.log('Change soemthing before updating the user data.');
                    }
                   

                } catch ( error ) {
                    console.log(error);
                }
            },

            close() {
                this.$emit('close');
            }
        },

        components: {
            Modal
        }
    }
</script>