<template>
    <ViewContainer v-if="user" >
        <EditUser 
            v-if="editUserState" 
            @close="toggleEditUserState"
            @updated="updateUser"
            :user="user"
        >
        </EditUser>

        <template slot="header">
           User #{{user.id}}
        </template>
  
        <div class="w-full pb-2 mb-2 flex flex-col justify-center items-center border-b border-gray-100 md:flex-row md:justify-start">
            <div class="w-32 h-32 rounded-md md:mr-4">
                <img v-if="user.avatar" :src="user.avatar" class="w-full h-full rounded-md object-cover"/>
                <svg v-else class="bg-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="128px" height="128px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            </div>
            <div class="flex flex-col items-center justify-center md:items-start">
                <div class="flex justify-center w-full mt-2 lg:justify-start">
                    <Status :deleted-at="user.deleted_at"/>
                    <Role :roleId="user.role_id"/>
                </div>
                <div class="font-semibold text-2xl mt-2">
                    {{user.first_name}} {{user.name}}
                </div>
                <div class="text-sm mt-2">
                    <a :href="`mailto:${user.email}`">{{user.email}}</a> <span class="mx-2">|</span> <a :href="`tel:${user.phone_number}`">{{user.phone_number}}</a>
                </div>
                <div class="flex items-baseline mt-2">
                    <span class="font-semibold text-sm mr-2">
                        Joined on:
                    </span>
                    <span class="text-xs">
                        {{ user.created_at | formatDate }}
                    </span>
                </div>
                <div class="flex items-center gap-x-2">   
                     <button 
                        @click="toggleEditUserState"
                        class="bg-amber-700 rounded-sm text-xs py-1 px-4 text-white mt-2 hover:bg-amber-600 active:bg-amber-400 active:shadow-inner active:outline-none"
                    >
                        Edit
                    </button>
                    <div v-if="canDisable">
                        <button 
                            v-if="user.deleted_at"
                            @click="restore"
                            class="bg-white border border-green-500 rounded-sm text-xs py-1 px-4 text-black hover:border-green-400 mt-2 active:shadow-inner active:outline-none"
                        >
                            Restore
                        </button>
                        <button 
                            v-else
                            @click="disable"
                            class="bg-white border border-red-500 rounded-sm text-xs py-1 px-4 text-black mt-2 hover:border-red-400 active:shadow-inner active:outline-none"
                        >
                            Disable
                        </button>
                    </div>
                    <button 
                        v-if="canDelete"
                        @click="callDeleteUser"
                        class="bg-red-700 rounded-sm text-xs py-1 px-4 text-white mt-2 hover:bg-red-600 active:bg-red-400 active:shadow-inner active:outline-none"
                    >
                        Delete
                    </button>
                </div>
               
            </div>
        </div>
        <div>
            Shifts
        </div>
        <div>
            Orders (20)
        </div>
        <div>
            Reservations
        </div>
    </ViewContainer>
  
</template>

<script>
    import store from '../../store/index';
    import ViewContainer from '../ViewContainer';
    import Status from '../../components/StatusComponent';
    import Role from '../../components/users/RoleComponent';
    import EditUser from '../../components/users/EditUserComponent';
    import { mapActions, mapGetters } from 'vuex';

    export default {
        async beforeRouteEnter(to, from, next) {
            try {
                const id = to.params.id;
                if(store.getters['Users/getUsers'].length > 0) {
                    let user = await store.dispatch('Users/getUser', id);
                    if(!user) {
                        user = await store.dispatch('Users/fetchUser', id);
                    }
                    next(vm => vm.setUser(user));
                } else {
                    const user = await store.dispatch('Users/fetchUser', id);
                    next(vm => vm.setUser(user));
                }
            } catch ( error ) {
                console.log(error)
            }
        },

        computed: {
            ...mapGetters('Users', ['getLoggedUser']),

            canDelete() {
                if(this.getLoggedUser) {
                    return this.getLoggedUser.role_id === 7 && this.user.id != this.getLoggedUser.id && this.user.role_id < this.getLoggedUser.role_id
                }
            },

            canDisable() {
                if(this.getLoggedUser) {
                    return (this.getLoggedUser.role_id === 6 || this.getLoggedUser.role_id === 7) && (this.user.id != this.getLoggedUser.id && this.user.role_id < this.getLoggedUser.role_id )               
                }
            },
        },
        
        data() {
            return {
                editUserState: false,
                user: null
            }
        },

        methods: {
            ...mapActions('Users', ['disableUser', 'restoreUser', 'deleteUser']),

            updateUser(patchedUser) {
                Object.keys(patchedUser).forEach(key => {         
                    this.user[key] = patchedUser[key];
                })
            },

            async disable(){
                try {
                    const payload = {
                        vm: this,
                        id: this.user.id
                    }

                    const response = await this.disableUser(payload);
                    this.user.deleted_at = response.deleted_at;
                } catch ( error ) {
                    console.log(error);
                }
            },

            async restore() {
                try {
                    const payload = {
                        vm: this,
                        id: this.user.id
                    }

                    const response = await this.restoreUser(payload);
                    this.user.deleted_at = response.deleted_at;
                } catch ( error ) {
                    console.log(error);
                }
            },

            async callDeleteUser() {
                try {
                    await this.deleteUser(this.user.id);
                    this.$router.push({name: 'Users'});

                } catch ( error ) {
                    console.log(error)
                }
            },

            toggleEditUserState() {
                this.editUserState = !this.editUserState;
            },

            setUser(user) {
                this.user = user;
            },

        },
        
        components: {
            ViewContainer,
            Status,
            Role,
            EditUser
        }
    }
</script>