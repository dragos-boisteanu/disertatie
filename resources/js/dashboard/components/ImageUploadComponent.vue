<template>
    <div>
        <file-pond
            name="image"
            ref="pond"
            label-idle="Upload image..."
            v-bind:allow-multiple="false"
            accepted-file-types="image/jpeg"
            :disabled="waiting" 
            :server="{
                url: '/api/dashboard/images',
                process: { 
                    headers: {
                        'X-CSRF-TOKEN': csrf
                    },
                    onload: (response) =>  addImagePath(response),
                }, 
                revert: {
                    url: '/delete',
                    headers: {
                        'X-CSRF-TOKEN': csrf
                    },
                }
            }"
            :files="files"
            :onaddfilestart="toggleWaitingForFileToUpload"
            :onprocessfileabort="toggleWaitingForFileToUpload"
        />

        <div class="text-right mt-3">
            <button 
                :disabled="disabled"
                class="border border-gray-600 h-7 text-xs text-gray-700 px-4 py-1 rounded hover:border-gray-500 hover:text-gray-600" 
                @click.prevent="clearImage"
            >
                Clear image
            </button>
        </div>
    </div>
</template> 

<script>
    import vueFilePond from "vue-filepond";
    import "filepond/dist/filepond.min.css";
    import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
    ); 
 
    export default {

        props: {
            disabled: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
 
        data() {
            return {
                files: [],
                waitForFiletoUpload: false,
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            }
        },

        methods: {
            toggleWaitingForFileToUpload() {
                this.waitForFiletoUpload = !this.waitForFiletoUpload;

                this.$emit('waitForFiletoUpload', waitForFiletoUpload);
            },

            waitForFiletoUpload() {
                console.log('eer');
                this.waitForFileUpload = true;
            },

            stopWaitingForFileToUpload() {
                this.waitForFileUpload = false;
            },

            addImagePath(imagePath) {
                this.$emit('setImagePath', imagePath);
            },

            clearImage() {
                this.$refs.pond.removeFile({revert: true});
                this.$emit('setImagePath', '');
            },
        },
        
        components: {
            FilePond
        }
    }

</script>