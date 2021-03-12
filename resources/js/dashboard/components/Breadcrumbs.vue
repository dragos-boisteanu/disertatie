<template>
    <nav v-if="$breadcrumbs.length" aria-label="breadcrumbs" class="breadcrumbs">
        <!-- <ol class="breadcrumbs"> -->
            <div v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb" :key="key"  class="breadcrumb-item hober:pointer-event-none" aria-current="page">
                <router-link :to="{ path: getPath(crumb) }" exact class="hover:pointer-events-none">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>
            </div>
        <!-- </ol> -->
    </nav>
</template>

