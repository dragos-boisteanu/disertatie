<template>
  <div>
    <file-pond
      name="image"
      ref="pond"
      label-idle="Upload image"      
      accepted-file-types="image/jpeg"
      :allow-multiple="false"
      :server="{
        url: '/api/dashboard/images',
        process: {
          headers: {
            'X-CSRF-TOKEN': csrf,
          },
          onload: (response) => addImagePath(response),
        },
        revert: {
          url: '/delete',
          headers: {
            'X-CSRF-TOKEN': csrf,
          },
          onload: () => clearImage(),
        },
      }"
      :files="files"
      @addfile="toggleWaitingForFileToUpload"
      @processfileabort="toggleWaitingForFileToUpload"
      @processfile="toggleWaitingForFileToUpload"
    />
  </div>
</template> 

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    clear: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  watch: {
    clear: function (newVal, oldVal) {
      if (newVal) {
        this.$refs.pond.removeFile({ revert: true });
      }
    },
  },

  data() {
    return {
      files: [],
      waitForFileToUpload: false,
      csrf: document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
    };
  },

  methods: {
    toggleWaitingForFileToUpload() {
      this.$emit("waitForFileToUpload");
    },

  addImagePath(imagePath) {
      this.$emit("setImagePath", imagePath);
    },

    clearImage() {
      this.$refs.pond.removeFile({ revert: true });
      this.$emit("setImagePath", "");
    },
  },

  components: {
    FilePond,
  },
};
</script>