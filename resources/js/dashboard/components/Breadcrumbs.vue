<template>
    <nav v-if="$breadcrumbs.length" aria-label="breadcrumbs" class="breadcrumbs flex items-center px-2 py-1 bg-gray-700 ">
        <!-- <ol class="breadcrumbs"> -->
            <div v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb" :key="key" class="breadcrumb-item mr-2 text-xs" aria-current="page">
                <router-link 
                    :to="{ path: getPath(crumb) }" 
                    exact
                    class="text-gray-400  hover:text-gray-50 "
                >
                    {{ getBreadcrumb(crumb.meta.breadcrumb) }}
                </router-link>
            </div>
        <!-- </ol> -->
    </nav>
</template>

