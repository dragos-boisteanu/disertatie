<template>
       <li class="text-gray-300 hover:text-gray-100">
            <router-link :to="{name}" class="block w-full cursor-pointer">{{name}}</router-link>
        </li>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true,
            },

        }
    }

</script>