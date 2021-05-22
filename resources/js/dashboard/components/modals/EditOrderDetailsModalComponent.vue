<template>
  <Modal
    @close="close"
  >
    <template slot="header">
      Order Details
    </template>

    <template slot="body">
      <form class="flex flex-col gap-y-4">

        <InputGroup
          v-if="clientAddresses.length > 0"
          id="addresses"
          label="Client adrresses"
          :eclass="{'flex-1':true}"
        >
          <Select
            v-model="localData.address"
            id="addresses"
            name="clientAddresses"
        >
            <option value="" selected disabled>Select client address</option>
            <option v-for="(address, index) in clientAddresses" :key="index" :value="address.address">{{address.address}}</option>
          </Select>
        </InputGroup>

        <InputGroup
            id="address"
            label="Adrress"
            :hasError="$v.localData.address.$error"
            :eclass="{'flex-1':true}"
            :required="true"
        >
            <template v-slot:errors>
              <p v-if="!$v.localData.address.required">
                  The address field is required 
              </p>
              <p v-if="!$v.localData.address.alphaNumSpaces">
                  The address field must contain only letters, spaces or numbers
              </p>
            </template>
            <Input
              v-model="localData.address"
              id="address"
              name="address"
              :class="{'border-red-600' : $v.localData.address.$error, 'border-green-600': $v.localData.address.$dirty && !$v.localData.address.$error}"
              @blur.native="$v.localData.address.$touch()"
            ></Input>
        </InputGroup>

        <InputGroup
          id="observations"
          label="Observations"
          :hasError="$v.localData.observations.$error"
        >
          <template v-slot:errors>
            <p v-if="!$v.localData.observations.alphaNumSpaces">
                The observations field should only contain letters, numbers or spaces
            </p>
          </template>
          <Textarea
            v-model="localData.observations"
            id="observations"
            name="observations"
            :class="{'border-red-600' : $v.localData.observations.$error, 'border-green-600': $v.localData.observations.$dirty && !$v.localData.observations.$error}"
            @blur.native="$v.localData.observations.$touch()"
          ></Textarea>
        </InputGroup>


      </form>
    </template>

   <template slot="footer">
      <button 
        @click.prevent="submit"
        class="flex items-center bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner  disabled:bg-gray-500 disabled:pointer-events-none"
    >
        Save
      </button>
      <button 
        @click.prevent="close"
        class="bg-transparent rounded-sm text-xs py-1 px-4 text-black text-bold mt-2 hover:text-gray-600"
    >
        Cancel
      </button>
  </template>
  </Modal>
</template>

<script>
  import Modal from './ModalComponent';
  import InputGroup from '../../components/inputs/InputGroupComponent';
  import Input from '../../components/inputs/TextInputComponent';
  import Textarea from '../../components/inputs/TextareaInputComponent';
  import Select from '../../components/inputs/SelectInputComponent';

  import {downoloadClientAddress} from '../../api/client.api'

  import { required } from 'vuelidate/lib/validators'
  import { alphaNumSpaces } from '../../validators/index';

  import { mapActions } from 'vuex';

  export default {

    props: {
      clientId: {
        type: [String, Number],
        required: false,
        default: null
      },
      orderId: {
        type: [String, Number],
        required: true
      },
      address: {
        type: String,
        required: true,
      },
      observations: {
        type: String,
        required: false,
      }
    },

    async mounted() {
      if(this.clientId) {
        const response = await downoloadClientAddress(this.clientId);
        this.clientAddresses = response.data.data.addresses;
      }

      this.localData.address = JSON.parse(JSON.stringify(this.address));
      this.localData.observations = JSON.parse(JSON.stringify(this.observations));

    },

    data() {
      return {
        clientAddresses: [],
        localData: {
          address: '',
          observations: '',
        }
      }
    },

    validations: {
      localData: {
        address: {
          required,
          alphaNumSpaces
        },
        observations: {
          alphaNumSpaces
        }
      }
    },

    methods: {
      ...mapActions('Orders', ['patchOrder']),

      async submit() {
        this.$v.$touch();

        if(!this.$v.$invalid) {
          const patchBody = {
            vm: this,
            localData: {
              id: this.orderId,
            }
          }

          if(this.localData.address !== this.address) {
            patchBody.localData.address = this.localData.address;
          }

          if(this.localData.observations !== this.observations) {
            patchBody.localData.observations = this.localData.observations
          }

          await this.patchOrder(patchBody);

        }
       
      },
      
      close() {
        this.$emit('closed');
      }
    },

    components: {
      Modal,
      InputGroup,
      Select,
      Textarea,
      Input
    }
  }
</script>