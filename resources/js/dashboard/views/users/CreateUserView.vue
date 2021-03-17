<template>
    <ViewContainer>
        <template slot="header">
            Create user account
        </template>

        <div class="flex flex-col">
            <div class="pb-5 border-b border-gray-200">
                <h2 class="mb-5 text-xl font-semibold">
                    Account details
                </h2>
                <div>
                    IMAGE UPLOAD
                </div>
                <div>
                    <label for="firstName" class="text-sm font-semibold">First name</label>
                    <input 
                        id="firstName" 
                        type="text" 
                        v-model="user.firstName"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    />
                </div>
                <div class="mt-2">
                    <label for="name" class="text-sm font-semibold">Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        v-model="user.name"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    />
                </div>
                <div class="mt-2">
                    <label for="birthDay" class="text-sm font-semibold">Birth day</label>
                    <input 
                        id="birthDay" 
                        type="date" 
                        v-model="user.birthDay"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    />
                </div>
                <div class="mt-2">
                    <label for="email" class="text-sm font-semibold">Email</label>
                    <input 
                        id="email" 
                        type="text" 
                        v-model="user.email"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    />
                </div>
                <div class="mt-2">
                    <label for="phoneNumber" class="text-sm font-semibold">Phone number</label>
                    <input 
                        id="phoneNumber" 
                        type="text" 
                        v-model="user.phoneNumber"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    />
                </div>
            </div>
            <div class="mt-5 pb-5">

                <h2 class="mb-5 text-xl font-semibold">
                    Address(optional)
                </h2>

                <div class="mt-2">
                    <label for="firstName" class="text-sm font-semibold">First name</label>
                    <input 
                        id="firstName" 
                        type="text" 
                        v-model="user.address.firstName"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    />
                </div>
                <div class="mt-2">
                    <label for="name" class="text-sm font-semibold">Name</label>
                    <input 
                        id="name" 
                        type="text" 
                        v-model="user.address.name"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    />
                </div>
                <div class="mt-2">
                    <label for="phoneNumber" class="text-sm font-semibold">Phone number</label>
                    <input 
                        id="phoneNumber" 
                        type="text" 
                        v-model="user.address.phoneNumber"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    />
                </div>

               <div class="mt-2">
                    <label for="county" class="text-sm font-semibold">County</label>
                    <select 
                        id="county"
                        v-model="user.address.county"
                        @change="getCitites"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    >
                        <option value="-1">Counties</option>
                        <option v-for="county in getCounties" :key="county.id" :value="county.id">{{county.name}}</option>
                    </select>
                </div>

                <div class="mt-2">
                    <label for="city" class="text-sm font-semibold">City</label>
                    <select 
                        id="city"
                        v-model="user.address.city"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"                      
                    >
                        <option value="-1">Cities</option>
                        <option v-for="city in cities" :key="city.id" :value="city.id">{{city.name}}</option>
                    </select>
                </div>

                <div class="mt-2">
                    <label for="address" class="text-sm font-semibold">Address</label>
                    <input 
                        id="address" 
                        type="text" 
                        v-model="user.address.address"
                        class="w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"    
                    />
                </div>
            </div>
            <div class="mt-5">
                <button 
                    class="w-full py-1 text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-20"
                    @click="submit"
                >
                    Submit
                </button>
            </div>
        </div>
    </ViewContainer>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import ViewContainer from '../ViewContainer';

    export default {
        computed: {
            ...mapGetters('Counties', ['getCounties']),
        },

        data() {
            return {
                counties: [],
                cities: [],
                user: {
                    firstName: '',
                    name: '',
                    email: '',
                    phoneNumber: '',
                    birthDay: '',
                    address: {
                        firstName: '',
                        name: '',
                        phoneNumber: '',
                        county: -1,
                        city: -1,
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
                    console.log(this.user);
                } catch ( error ) {
                    console.log(error);
                }
            },
            
            async getCitites() {
                try {
                    this.cities= await this.fetchCitites(this.user.address.county);
                } catch ( error ) {
                    console.log(error)
                }
            }
        },

        components: {
            ViewContainer
        }
    }
</script>