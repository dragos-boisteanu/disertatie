<template>
  <div class="mt-4 md:mt-0 lg:flex-1">
    <ConfirmActionModalComponent
      v-if="confirmModalState"
      title="Confirm action"
      mainMessage="Are you sure you want to delete the selected ingredient ?"
      @cancel="toggleConfirmModal"
      @ok="removeIngredient"
    ></ConfirmActionModalComponent>
    <form
      class="
        flex flex-col
        items-stretch
        justify-items-start
        gap-y-3
        md:flex-auto
      "
    >
      <div class="flex flex-col gap-y-3 bg-white shadow rounded-sm p-5">
        <h2 class="mb-5 text-xl font-semibold">Ingredient</h2>

        <div class="w-full flex-1 flex gap-x-4">
          <InputGroup
            id="name"
            label="Name"
            :hasError="$v.ingredient.name.$error"
          >
            <template v-slot:errors>
              <p v-if="!$v.ingredient.name.required">
                The name field is required
              </p>
              <p v-if="!$v.ingredient.name.alphaSpaces">
                The name field must contain only letters or spaces
              </p>
              <p v-if="!$v.ingredient.name.maxLength">
                The name field must be no longer than 50 characters
              </p>
            </template>
            <Input
              v-model="$v.ingredient.name.$model"
              id="name"
              name="name"
              :eclass="{
                'border-red-600': $v.ingredient.name.$error,
                'border-green-600':
                  $v.ingredient.name.$dirty && !$v.ingredient.name.$error,
              }"
            ></Input>
          </InputGroup>

          <InputGroup id="unitId" label="Unit" :hasError="$v.unitId.$error">
            <template v-slot:errors>
              <p v-if="!$v.unitId.required">The unit field is required</p>
            </template>
            <Select
              v-model="unitId"
              id="unitId"
              name="weight_units"
              :eclass="{
                'border-red-600': $v.unitId.$error,
                'border-green-600': $v.unitId.$dirty && !$v.unitId.$error,
              }"
              :disabled="waiting"
              @blur.native="$v.unitId.$touch()"
              @change.native="selectUnit"
            >
              <option value="" disabled>Select unit</option>
              <option :value="unit.id" v-for="unit in getUnits" :key="unit.id">
                {{ unit.name }} ({{ unit.description }})
              </option>
            </Select>
          </InputGroup>
        </div>
      </div>
      <div>
        <div>
           <Button
            type="secondary"
            :disabled="waiting"
            @click.native.prevent="resetForm"
            class="mt-2"
          >
            Reset
          </Button>
        </div>
        <div>
          <Button
            v-if="isIngredientSelected"
            type="primary"
            :disabled="waiting"
            @click.native.prevent="callPatchIngredient"
            class="mt-2"
          >
            Update
          </Button>
          <Button
            v-else
            type="primary"
            :disabled="waiting"
            @click.native.prevent="submit"
            class="mt-2"
            >Submit
          </Button>
          <Button
            v-if="canDelete"
             type="danger"
            :disabled="waiting"
            @click.native.prevent="toggleConfirmModal"
            class="mt-2"
          >
            Delete
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Input from "../../components/inputs/TextInputComponent";
import Select from "../../components/inputs/SelectInputComponent";
import Button from "../../components/buttons/ButtonComponent";
import InputGroup from "../../components/inputs/InputGroupComponent";

import ConfirmActionModalComponent from "../modals/ConfirmActionModalComponent.vue";

import { required, maxLength } from "vuelidate/lib/validators";
import { alphaSpaces } from "../../validators/index";

import _find from "lodash/find";

export default {
  props: {
    ingredientId: {
      type: [Number, String],
      required: false,
      default: null,
    },
  },

  computed: {
    ...mapGetters("Ingredients", ["getIngredients"]),
    ...mapGetters("Units", ["getUnits"]),

    isIngredientSelected() {
      return this.ingredientId ? true : false;
    },

    canDelete() {
      return this.ingredient.productsCount === 0 
    }
  },

  data() {
    return {
      confirmModalState: false,
      waiting: false,
      unitId: "",
      ingredient: {
        id: "",
        name: "",
        unit: {
          id: "",
          name: "",
        },
      },
    };
  },

  validations: {
    ingredient: {
      name: {
        required,
        alphaSpaces,
        maxLength: maxLength(50),
      },
    },
    unitId: {
      required,
    },
  },

  watch: {
    ingredientId: function (value) {
      if (value) {
        this.ingredient = JSON.parse(
          JSON.stringify(_find(this.getIngredients, ["id", value]))
        );
        this.unitId = this.ingredient.unit.id;
      }
    },
  },

  methods: {
    ...mapActions("Ingredients", [
      "postIngredient",
      "patchIngredient",
      "deleteIngredient",
    ]),

    ...mapActions("Notification", ["openNotification"]),

    async submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.waiting = true;
        await this.postIngredient(this.ingredient);
        this.waiting = false;
        this.resetForm();
      }
    },

    async callPatchIngredient() {
      const originalIngredient = _find(this.getIngredients, [
        "id",
        this.ingredient.id,
      ]);

      const payload = {
        vm: this,
        ingredient: {
          id: this.ingredient.id,
        },
      };

      let counter = 0;

      Object.keys(this.ingredient).forEach((key) => {
        if (originalIngredient[key] !== this.ingredient[key]) {
          payload.ingredient[key] = this.ingredient[key];
          counter++;
        }
      });

      if (counter > 0) {
        this.waiting = true;
        await this.patchIngredient(payload);
        this.waiting = false;
      } else {
        this.openNotification({
          type: "info",
          show: true,
          message: "Nothing to update",
        });
      }
    },

    toggleConfirmModal() {
      this.confirmModalState = !this.confirmModalState;
    },

    async removeIngredient() {
      try {
        this.waiting = true;
        this.toggleConfirmModal();
        await this.deleteIngredient(this.ingredient.id);
        this.waiting = false;
        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },

    selectUnit() {
      this.ingredient.unit = _find(this.getUnits, [
        "id",
        parseInt(this.unitId),
      ]);
    },

    resetForm() {
      this.$v.$reset();
      this.waiting = false;
      this.unitId = "";
      this.ingredient = {
        id: "",
        name: "",
        unit: {
          id: "",
          name: "",
        },
      };

      this.$emit("reset");
    },
  },

  components: {
    Input,
    Select,
    Button,
    InputGroup,

    ConfirmActionModalComponent
  },
};
</script>