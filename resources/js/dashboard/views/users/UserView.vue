<template>
  <ViewContainer v-if="user">
    <template slot="header">
      <div class="flex items-center justify-between md:justify-start gap-x-4">
        <span> User #{{ user.id }}</span>
        <button
          @click="refresh"
          class="
            p-1
            bg-sky-600
            rounded-sm
            active:shadow-inner
            active:bg-sky-500
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#ffffff"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
            />
          </svg>
        </button>
      </div>
    </template>

    <div
      class="
        w-full
        pb-2
        mb-2
        flex flex-col
        justify-center
        items-center
        md:flex-row
        md:justify-start
      "
    >
      <div class="w-32 h-32 rounded-md md:mr-4">
        <img
          v-if="user.image"
          :src="user.image"
          class="w-full h-full rounded-md object-cover"
        />
        <svg
          v-else
          class="bg-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="128px"
          height="128px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
          />
        </svg>
      </div>
      <div class="flex flex-col items-center justify-center md:items-start">
        <div class="flex justify-center gap-x-3 w-full mt-2 lg:justify-start">
          <Status :deleted-at="user.deletedAt" />
          <Role :role-name="user.role.name" />
        </div>
        <div class="font-semibold text-2xl mt-2">
          {{ user.firstName }} {{ user.lastName }}
        </div>
        <div class="text-sm mt-2">
          <a :href="`mailto:${user.email}`">{{ user.email }}</a>
          <span class="mx-2">|</span>
          <a :href="`tel:${user.phoneNumber}`">{{ user.phoneNumber }}</a>
        </div>
        <div class="flex items-baseline mt-2">
          <span class="font-semibold text-sm mr-2"> Joined on: </span>
          <span class="text-xs">
            {{ user.createdAt | formatDate }}
          </span>
        </div>
        <div class="flex items-center gap-x-2">
          <button
            @click="editUser"
            class="
              bg-amber-700
              rounded-sm
              text-xs
              py-1
              px-4
              text-white
              mt-2
              hover:bg-amber-600
              active:bg-amber-400
              active:shadow-inner
              active:outline-none
            "
          >
            Edit
          </button>
          <div v-if="canDisable">
            <button
              v-if="user.deletedAt"
              @click="restore"
              class="
                bg-white
                border border-green-500
                rounded-sm
                text-xs
                py-1
                px-4
                text-black
                hover:border-green-400
                mt-2
                active:shadow-inner
                active:outline-none
              "
            >
              Restore
            </button>
            <button
              v-else
              @click="disable"
              class="
                bg-white
                border border-red-500
                rounded-sm
                text-xs
                py-1
                px-4
                text-black
                mt-2
                hover:border-red-400
                active:shadow-inner
                active:outline-none
              "
            >
              Disable
            </button>
          </div>
        </div>
      </div>
    </div>
  </ViewContainer>
</template>

<script>
import ViewContainer from "../ViewContainer";
import Status from "../../components/StatusComponent";
import Role from "../../components/users/RoleComponent";
import { mapGetters } from "vuex";

import { downloadUser, disableUser, restoreUser } from "../../api/users.api";

export default {
  async beforeRouteEnter(to, from, next) {
    const response = await downloadUser(to.params.id);
    next((vm) => vm.setUser(response.data.data));
  },

  computed: {
    ...mapGetters("Users", ["getLoggedUser", "isAdmin", "isLocationManager"]),

    // canDelete() {
    //     if(this.getLoggedUser) {
    //         return this.getLoggedUser.role_id === 7 && this.user.id != this.getLoggedUser.id && this.user.role_id < this.getLoggedUser.role_id
    //     }
    // },

    canDisable() {
      if (this.getLoggedUser) {
        return (
          this.getLoggedUser.id !== this.user.id &&
          (this.isAdmin || this.isLocationManager)
        );
      }
    },
  },

  data() {
    return {
      editUserState: false,
      user: null,
    };
  },

  methods: {
    updateUser(patchedUser) {
      Object.keys(patchedUser).forEach((key) => {
        this.user[key] = patchedUser[key];
      });
    },

    editUser() {
      this.$router.push({ name: "EditUser", params: { id: this.user.id } });
    },

    async disable() {
      try {
        const response = await disableUser(this.user.id);
        this.user.deletedAt = response.data.deletedAt;
        this.$toast.success(response.data.message);
      } catch (error) {
        if (error.response && error.response.data) {
          this.$toast.error(error.response.data);
        }
      }
    },

    async restore() {
      try {
        const response = await restoreUser(this.user.id);
        this.user.deletedAt = response.data.deletedAt;
        this.$toast.success(response.data.message);
      } catch (error) {
        if (error.response && error.response.data) {
          this.$toast.error(error.response.data);
        }
      }
    },

    // async callDeleteUser() {
    //     try {
    //         this.$Progress.start()
    //         await this.deleteUser(this.user.id);
    //         this.$router.push({name: 'Users'});

    //         this.$Progress.finish()
    //     } catch ( error ) {
    //         this.$Progress.failed()
    //         console.log(error)
    //     }
    // },

    setUser(user) {
      this.user = user;
    },

    async refresh() {
      try {
        this.$Progress.start();
        const response = await downloadUser(this.user.id);
        this.setUser(response.data.data);
        this.$Progress.finish();
      } catch (error) {
        if (error.response && error.response.data.message) {
          this.$toast.error(error.response.data.message);
        } else {
          this.$toast.error("Something went wrong, try again later");
        }

        this.$Progress.fail();

        console.log(error);
      }
    },
  },

  components: {
    ViewContainer,
    Status,
    Role,
    // EditUser
  },
};
</script>