<template>
    <div class="relative px-1 cursor-pointer fill-current text-gray-400 hover:text-orange-500 ">
        <div class="mx-1">
            <slot name="link"></slot>
        </div>
        <div class="absolute -top-1.5 -right-0.5 bg-red-600 text-xxs text-white rounded-full px-1.5 py-0">
            <slot name="counter"></slot>
        </div>
    </div>
</template>