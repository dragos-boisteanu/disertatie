<template>
  <file-pond
    name="image"
    ref="pond"
    label-idle="Add image"
    accepted-file-types="image/jpeg"
    :allow-multiple="false"
    :allowImageValidateSize="true"
    :imageValidateSizeMinWidth="imageMinSize"
    :imageValidateSizeMinHeight="imageMinSize"
    :allowFileSizeValidation="true"
    maxFileSize="15MB"
    @updatefiles="updatefiles"
  />
</template>

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size";

import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview
);

export default {
  props: {
    allowImageValidateSize: {
      type: Boolean,
      required: false,
      default: false,
    },

    imageMinSize: {
      type: String,
      require: false,
      default: "0",
    },

    maxFileSize: {
      type: String,
      required: false,
      default: "200MB",
    },

    allowMultiple: {
      type: Boolean,
      requried: false,
      default: false,
    },

    clear: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  watch: {
    clear: function (newVal) {
      if (newVal) {
        this.$refs.pond.removeFile({ revert: true });
        this.$emit("removed");
      }
    },
  },

  methods: {
    updatefiles(files) {
      this.$emit("updatefiles", files);
    },
  },

  components: {
    FilePond,
  },
};
</script>