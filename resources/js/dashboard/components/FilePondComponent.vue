<template>
  <div id="app">
    <file-pond
        name="image"
        ref="pond"
        label-idle="Upload user profile image..."
        v-bind:allow-multiple="false"
        accepted-file-types="image/jpeg, image/png"
        :server="{
            url: '/api/dashboard/images',
            process: { 
                headers: {
                    'X-CSRF-TOKEN': csrf
                },
                onload: (response) =>  this.handleResponse(response) 
            },
            fetch: null,
            revert: {
                url: '/delete',
                headers: {
                    'X-CSRF-TOKEN': csrf
                },
            }
        }"
        :file="file"
        :init="handleFilePondInit"
    />
  </div>
</template>

<script>
    // Import Vue FilePond
    import vueFilePond from "vue-filepond";

    // Import FilePond styles
    import "filepond/dist/filepond.min.css";

    // Import FilePond plugins
    // Please note that you need to install these plugins separately

    // Import image preview plugin styles
    import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

    // Import image preview and file type validation plugins
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
    // import FilePondPluginImagePreview from "filepond-plugin-image-preview";

    // Create component
    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
        // FilePondPluginImagePreview
    );

    export default {

        data: function () {
            return { 
                file: null,
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            };
        },

        methods: {
            handleFilePondInit: function () {
                console.log("FilePond has initialized");

                // FilePond instance methods are available on `this.$refs.pond`
            },

            handleResponse(response) {
                this.$emit('uploaded', response);
                console.log(response);
            },

            reset() {
                this.$refs.pond.removeFile();
            }
        },
        components: {
            FilePond,
        } ,
    };
</script>