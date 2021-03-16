<template>
       <li class="flex gap-x-2 text-gray-300 hover:text-gray-100 px-5 py-2">
           <span><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><rect fill="none" height="24" width="24"/><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M5,19V5h6v14H5z M19,19h-6v-7h6V19z M19,10h-6V5h6V10z"/></svg></span>
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