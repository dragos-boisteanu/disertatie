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
      @addfile="fileAdded"
      @processfileabort="processFileAbort"
      @processfile="fileProcessed"

      :allowImageValidateSize="true"
      :imageValidateSizeMinWidth="imageSize"
      :imageValidateSizeMaxWidth="imageSize"
      :imageValidateSizeMinHeight="imageSize"
      :imageValidateSizeMaxHeight="imageSize"
      :allowFileSizeValidation="true"
      maxFileSize="5MB"
    />
  </div>
</template> 

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";

import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateSize
  // FilePondPluginImagePreview
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
      required: false,
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
      imageSize: "512",
      files: [],
      waitForFileToUpload: false,
      csrf: document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
    };
  },

  methods: {
    fileAdded() {
      this.$emit("fileAdded", true);
    },

    processFileAbort() {
      this.$emit("processFileAborted", false);
    },

    fileProcessed() {
      this.$emit("fileProcessed", false);
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