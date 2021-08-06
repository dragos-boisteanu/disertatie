<template>
  <ViewContainer>
    <template slot="header"> Create user account </template>

    <form class="flex flex-col">
      <div
        class="
          flex flex-col
          lg:items-start
          lg:flex-row
          lg:gap-x-6
          lg:w-full
          2xl:w-10/12
        "
      >
        <div
          class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 lg:flex-1"
        >
          <h2 class="mb-5 text-xl font-semibold">Account details</h2>

          <file-pond
            name="image"
            ref="pond"
            label-idle="Upload image"
            accepted-file-types="image/jpeg"
            :allow-multiple="false"
            :files="files"
            :allowImageValidateSize="true"
            :imageValidateSizeMinWidth="imageSize"
            :imageValidateSizeMinHeight="imageSize"
            :allowFileSizeValidation="true"
            maxFileSize="15MB"
            @updatefiles="onUpdateFiles"
          />

          <div
            class="
              flex flex-col
              gap-y-4
              md:flex md:flex-row
              md:items-center
              md:justify-between
              md:gap-x-4
            "
          >
            <InputGroup
              id="firstName"
              label="First name"
              :hasError="$v.user.firstName.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.user.firstName.required">
                  The first name field is required
                </p>
                <p v-if="!$v.user.firstName.maxLength">
                  The first name field should not be longer than 50 characters
                </p>
                <p v-if="!$v.user.firstName.alphaSpaces">
                  The first name field must contain only letters and spaces
                </p>
              </template>
              <Input
                v-model="$v.user.firstName.$model"
                id="firstName"
                name="firstName"
                :class="{
                  'border-red-600': $v.user.firstName.$error,
                  'border-green-600':
                    $v.user.firstName.$dirty && !$v.user.firstName.$error,
                }"
              />
            </InputGroup>
            <InputGroup
              id="lastName"
              label="Last name"
              :hasError="$v.user.lastName.$error"
              :class="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.user.lastName.required">
                  The last name field is required
                </p>
                <p v-if="!$v.user.lastName.maxLength">
                  The last name field should not be longer than 50 characters
                </p>
                <p v-if="!$v.user.lastName.alphaSpaces">
                  The last name field must contain only letters and spaces
                </p>
              </template>
              <Input
                v-model="$v.user.lastName.$model"
                id="lastName"
                type="text"
                :class="{
                  'border-red-600': $v.user.lastName.$error,
                  'border-green-600':
                    $v.user.lastName.$dirty && !$v.user.lastName.$error,
                }"
              />
            </InputGroup>
          </div>

          <div
            class="
              flex flex-col
              gap-y-4
              md:flex md:flex-row
              md:items-center
              md:gap-x-4
            "
          >
            <InputGroup
              id="email"
              label="Email"
              :hasError="$v.user.email.$error"
              :eclass="{ 'felx-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.user.email.required">
                  The email field is required
                </p>
                <p v-if="!$v.user.email.email">
                  The email field must have valid email
                </p>
              </template>
              <Input
                v-model="$v.user.email.$model"
                id="email"
                name="email"
                :class="{
                  'border-red-600': $v.user.email.$error,
                  'border-green-600':
                    $v.user.email.$dirty && !$v.user.email.$error,
                }"
              />
            </InputGroup>
            <InputGroup
              id="phoneNumber"
              label="Phone number"
              :hasError="$v.user.phoneNumber.$error"
              :eclass="{ 'flex-1': true }"
            >
              <template v-slot:errors>
                <p v-if="!$v.user.phoneNumber.required">
                  The phone number field is required
                </p>
                <p v-if="!$v.user.phoneNumber.phoneNumber">
                  The phone number is invalid
                </p>
              </template>
              <Input
                v-model="$v.user.phoneNumber.$model"
                id="phoneNumber"
                name="phoneNumber"
                :class="{
                  'border-red-600': $v.user.phoneNumber.$error,
                  'border-green-600':
                    $v.user.phoneNumber.$dirty && !$v.user.phoneNumber.$error,
                }"
              />
            </InputGroup>
          </div>

          <InputGroup id="role" label="Role" :hasError="$v.user.roleId.$error">
            <template v-slot:errors>
              <p v-if="!$v.user.roleId.required">The role field is required</p>
            </template>
            <Select
              v-model="$v.user.roleId.$model"
              id="role"
              name="role"
              :class="{
                'border-red-600': $v.user.roleId.$error,
                'border-green-600':
                  $v.user.roleId.$dirty && !$v.user.roleId.$error,
              }"
            >
              <option value="" selected disabled>Select role</option>
              <option
                v-for="role in availableRoles"
                :key="role.id"
                :value="role.id"
              >
                {{ role.name }}
              </option>
            </Select>
          </InputGroup>
        </div>

        <div
          class="
            mt-5
            flex flex-col
            gap-y-3
            bg-white
            shadow
            rounded-sm
            p-5
            border-b border-gray-200
            lg:mt-0
            lg:border-r
            lg:pr-5
            lg:border-b-0
            lg:flex-1
          "
        >
          <h2 class="mb-5 text-xl font-semibold">
            <input
              id="addressToggle"
              type="checkbox"
              v-model="hasAddress"
              @click="toggleAddressState"
            />
            <label for="addressToggle">Address (optional)</label>
          </h2>

          <div
            ref="addressForm"
            class="flex flex-col gap-y-4"
            v-show="hasAddress"
          >
            <div
              class="
                flex flex-col
                gap-y-4
                md:flex md:flex-row
                md:items-center
                md:justify-between
                md:gap-x-4
              "
            >
              <InputGroup
                id="addressAddress"
                label="Address"
                :hasError="$v.address.$error"
              >
                <template v-slot:errors>
                  <p v-if="!$v.address.required">
                    The address field is required
                  </p>
                  <p v-if="!$v.address.alphaNumSpaces">
                    The address field must contain only letters, numbers and
                    spaces
                  </p>
                </template>
                <Input
                  v-model="$v.address.$model"
                  id="addressAddress"
                  name="address"
                  :class="{
                    'border-red-600': $v.address.$error,
                    'border-green-600': $v.address.$dirty && !$v.address.$error,
                  }"
                  :disabled="!hasAddress"
                />
              </InputGroup>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 flex md:justify-start">
        <Button
          type="primary"
          :disabled="waiting"
          :waiting="waiting"
          @click.native.prevent="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  </ViewContainer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ViewContainer from "../ViewContainer";

import ImageUploadComponent from "../../components/ImageUploadComponent";

import Input from "../../components/inputs/TextInputComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";
import Select from "../../components/inputs/SelectInputComponent";
import Button from "../../components/buttons/ButtonComponent";

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

import {
  required,
  email,
  requiredIf,
  maxLength,
} from "vuelidate/lib/validators";

import {
  alphaSpaces,
  alphaNumSpaces,
  phoneNumber,
} from "../../validators/index";

import { storeUser, removeTempImage } from "../../api/users.api";

export default {
  computed: {
    ...mapGetters("Roles", ["getRoles"]),
    ...mapGetters("Users", ["isWaiter"]),

    availableRoles() {
      if (this.isWaiter) {
        return this.getRoles.filter((role) => role.name === "Client");
      }

      return this.getRoles;
    },

    url() {
      return `/api/dashboard/temp-images`;
    },
  },

  data() {
    return {
      imageSize: "2000",
      files: [],

      waiting: false,
      clearImage: false,
      hasAddress: false,

      user: {
        image: null,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        roleId: "",
      },

      address: "",
    };
  },

  validations: {
    user: {
      firstName: {
        required,
        maxLength: maxLength(50),
        alphaSpaces,
      },
      lastName: {
        required,
        maxLength: maxLength(50),
        alphaSpaces,
      },
      email: {
        required,
        email,
      },
      phoneNumber: {
        required,
        // phoneNumber,
      },
      roleId: {
        required,
      },
    },
    address: {
      required: requiredIf(function () {
        return this.hasAddress;
      }),
      alphaNumSpaces,
    },
  },

  methods: {
    ...mapActions("Notification", ["openNotification"]),

    onUpdateFiles(files) {
      if (files) {
        this.user.image = files[0].file;
      }
    },

    async submit() {
      this.$v.user.$touch();

      if (this.hasAddress) {
        this.$v.address.$touch();
      }

      if (!this.$v.$invalid) {
        try {
          this.$Progress.start();

          this.waiting = true;

          let payload = new FormData();

          payload.append("firstName", this.user.firstName);
          payload.append("lastName", this.user.lastName);
          payload.append("email", this.user.email);
          payload.append("phoneNumber", this.user.phoneNumber);
          payload.append("roleId", this.user.roleId);

          if (this.hasAddress) {
            formData.append("address", this.address);
          }

          if (this.user.image) {
            payload.append("image", this.user.image);
          }

          const response = await storeUser(payload);

          this.restForm();

          this.waiting = false;

          this.$Progress.finish();
          this.$toast.success(response.data.message);
        } catch (error) {
          this.$Progress.fail();
          this.$v.$touch();
          if (error.response && error.response.data.errors) {
            this.$toast.error(error.response.data.message);
          } else {
            this.$toast.error("Something went wrong, tray again later");
          }

          this.waiting = false;

          console.log(error);
        }
      }
    },

    restForm() {
      this.$v.$reset();

      this.cities = [];
      this.files = [];

      if (this.user.avatar) {
        delete this.user.avatar;
        this.clearImage = true;
      }

      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        roleId: 1,
      };

      this.address = "";
    },

    toggleAddressState() {
      if (this.required) {
        this.address = "";
      }
      this.$v.address.$reset();
      this.required = !this.required;
    },

    setWaiting(value) {
      this.waiting = value;
    },

    async removeImage() {
      try {
        this.$Progress.start();
        const payload = {
          imagePath: this.user.avatar,
        };

        const response = await removeTempUserImage(payload);

        this.user.image = "";
        this.clearImage = true;
        this.$Progress.finish();
        this.$toast.success(response.data.message);
      } catch (error) {
        this.$Progress.fail();
        if (error.response && error.response.data.message) {
          this.$toast.error(error.response.data.message);
        } else {
          this.$toast.error("Something went wrong, try again later");
        }
        console.log(error);
      }
    },

    setImagePath(response) {
      const responseObj = JSON.parse(response);

      this.user.image = responseObj.imagePath;
    },
  },

  components: {
    ViewContainer,
    ImageUploadComponent,
    Input,
    Select,
    InputGroup,
    Button,
  },
};
</script>
