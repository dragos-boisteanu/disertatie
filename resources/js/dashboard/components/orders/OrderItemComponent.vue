<template>
    <tr 
        class="transition-shadow duration-200 ease-in-out text-sm border-white transform
        hover:bg-warmGray-100 even:bg-gray-50"
    >
        <td class="p-2 text-center font-semibold">{{ index + 1 }}</td>
        <td class="p-2">{{ item.name }}</td>
        <td class="p-2">{{ item.quantity }}</td>
        <td class="p-2">{{ price }} Ron</td>
        <td class="p-2 flex items-center justify-center relative">
            <button @click.prevent="toggleMenu">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
            </button>
            <ul v-if="showMenu" class="absolute z-50 top-5 right-4 lg:top-5 lg:-left-2 lg:right-auto p-1 bg-white text-xs text-gray-800 hover:text-black rounded shadow">
                <li class="p-2 cursor-pointer lg:p-1" @click.prevent="openProductModal">
                    Edit
                </li>
                <li class="p-2 cursor-pointer lg:p-1" @click.prevent="removeProduct">
                    Remove
                </li>
            </ul>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            index: {
                type: Number,
                requried: true,
            },

            item: {
                type: Object,
                required: true
            },

        },

        computed: {
            price() {
                return this.item.price * this.item.quantity
            }
        },

        data() {
            return {
                showMenu: false,
            }
        },

        methods: {
            toggleMenu() {
                this.showMenu = !this.showMenu;
            },

            openProductModal() {
                this.$emit('edit', this.item);
                this.toggleMenu();
            },

            removeProduct(){
                this.$emit('remove', this.item.id);
                this.toggleMenu();
            }
            
        }
    }
</script>