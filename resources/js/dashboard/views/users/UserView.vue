<template>
    <div>
        ID: <span>{{user.id}}</span>
    </div>
</template>

<script>
    import store from '../../store/index';

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
        }
    }
</script>