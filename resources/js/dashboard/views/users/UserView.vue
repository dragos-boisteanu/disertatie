<template>
    <ViewContainer>
        <template slot="header">
           User #{{user.id}}
        </template>

        <div class="w-full pb-2 mb-2 flex flex-col justify-center items-center border-b border-gray-100">
            <div class="w-32 h-32 bg-gray-500 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="128px" height="128px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            </div>
            <div class="flex justify-between w-32 mt-2">
                <div class="py-1 px-2 text-xs text-white rounded-sm bg-lightBlue-600">
                    {{user.role}}
                </div>
                <Status :deleted-at="user.deletedAt"/>
            </div>
            <div class="font-semibold text-2xl mt-2">
                {{user.firstName}} {{user.name}}
            </div>
            <div class="text-sm mt-2">
                {{user.email}} <span class="mx-2">|</span> {{user.phoneNumber}}
            </div>
            <div class="flex items-baseline mt-2">
                <span class="font-semibold text-sm mr-2">
                    Joined on:
                </span>
                <span class="text-xs">
                    {{ user.createdAt | formatDate }}
                </span>
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

        data() {
            return {
                user: {}
            }
        },

        methods: {
            setUser(user) {
                this.user = user;
            }
        },
        
        components: {
            ViewContainer,
            Status
        }
    }
</script>