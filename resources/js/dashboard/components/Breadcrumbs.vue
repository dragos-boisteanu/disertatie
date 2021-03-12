<template>
    <nav v-if="$breadcrumbs.length" aria-label="breadcrumbs" class="breadcrumbs">
        <!-- <ol class="breadcrumbs"> -->
            <div v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb" :key="key"  class="breadcrumb-item" aria-current="page">
                <router-link :to="{ path: getPath(crumb) }" exact>{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>
            </div>
        <!-- </ol> -->
    </nav>
</template>

