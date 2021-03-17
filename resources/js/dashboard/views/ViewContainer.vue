<template>
    <div class="flex-1 w-full p-3 pt-0 bg-gray-50 lg:p-4 lg:pt-0">
        <h2 class="text-3xl my-5 text-black font-semibold">
            <slot name="header"></slot>
        </h2>
        
        <slot></slot>
    </div>
</template>

