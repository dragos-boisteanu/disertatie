<template>
    <div class="absolute lg:relative left-0 top-0 w-9/12 md:w-2/5 lg:w-full h-full bg-coolGray-800 overflow-y-auto" >
        <div class="text-white flex flex-col items-center justify-start mb-2" v-if="getLoggedUser">
            <div class="my-5 flex flex-col items-center justify-start">
                <div class="w-24 h-24 rounded-md">
                    <img v-if="getLoggedUser.avatar" :src="getLoggedUser.avatar" class="w-full h-full rounded-md object-cover"/>
                    <svg v-else class="bg-gray-500 rounded-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="96px" height="96px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                </div>
                <div class="text-center mt-2 text-xl">
                    {{ getLoggedUser.name }}
                </div>
                <div class="mt-2 flex items-center justify-center gap-x-2">
                    <form method="POST" action='/logout' class="flex items-center">
                        <input type="hidden" name="_token" :value="csrf"/>

                        <button type="submit">
                           <svg class="fill-current text-red-600 hover:text-red-400" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
                        </button>
                    </form>

                    
                    <Role :role-id="getLoggedUser.role_id"></Role>
                </div>
            </div> 
        </div>
        

        <div class="text-gray-300 hover:text-white pb-2 mb-2 border-b border-coolGray-500">
            <router-link :to="{name: 'Dashboard'}" class="block w-full cursor-pointer py-2 pl-8 border-l-4 border-coolGray-800 hover:border-lightBlue-400 hover:bg-lightBlue-400 hover:bg-opacity-20" exact>Dashboard</router-link>
        </div>
     
        <div class="pt-2">
            <div class="text-sm text-coolGray-400 font-bold px-5 tracking-wider">
                USERS
            </div>
            <ul class="mt-1">
                <li class="text-sm text-gray-300 hover:text-white">
                    <router-link :to="{name: 'Users'}" class="block w-full cursor-pointer py-2 pl-8 border-l-4 border-coolGray-800 hover:border-lightBlue-400 hover:bg-lightBlue-400 hover:bg-opacity-20" exact>Users List</router-link>
                </li>
                <li class="text-sm text-gray-300 hover:text-white">
                    <router-link :to="{name: 'CreateUser'}" class="block w-full cursor-pointer py-2 pl-8 border-l-4 border-coolGray-800 hover:border-lightBlue-400 hover:bg-lightBlue-400 hover:bg-opacity-20" exact >Create User Profile</router-link>
                </li>
            </ul>
        </div>

        <div class="pt-2">
            <div class="text-sm text-coolGray-400 font-bold px-5 tracking-wider">
                PRODUCTS
            </div>
            <ul class="mt-1">
                <li class="text-sm text-gray-300 hover:text-white tracking-wid">
                    <router-link :to="{name: 'Products'}" class="block w-full cursor-pointer py-2 pl-8 border-l-4 border-coolGray-800 hover:border-lightBlue-400 hover:bg-lightBlue-400 hover:bg-opacity-20" exact >Products list</router-link>
                </li>
                <li class="text-sm text-gray-300 hover:text-white tracking-wide">
                    <router-link :to="{name: 'AddProduct'}" class="block w-full cursor-pointer py-2 pl-8 border-l-4 border-coolGray-800 hover:border-lightBlue-400 hover:bg-lightBlue-400 hover:bg-opacity-20">Add product</router-link>
                </li>
                <li class="text-sm text-gray-300 hover:text-white tracking-wide">
                    <router-link :to="{name: 'Ingredients'}" class="block w-full cursor-pointer py-2 pl-8 border-l-4 border-coolGray-800 hover:border-lightBlue-400 hover:bg-lightBlue-400 hover:bg-opacity-20 ">Ingredients</router-link>
                </li>
                <li class="text-sm text-gray-300 hover:text-white tracking-wide">
                    <router-link :to="{name: 'Categories'}" class="block w-full cursor-pointer py-2 pl-8 border-l-4 border-coolGray-800 hover:border-lightBlue-400 hover:bg-lightBlue-400 hover:bg-opacity-20">Categories</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import NavigationLink from './NavigationLinkComponent';
    
    import Role from '../users/RoleComponent';

    export default {

        computed: {
            ...mapGetters('Users', ['getLoggedUser']),

        },

        data() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        },

        components: {
            NavigationLink,
            Role
        }
    }
</script>


<style scoped>
    .router-link-active,
    .router-link-exact-active {
        @apply border-lightBlue-400 text-white;
    }
</style>