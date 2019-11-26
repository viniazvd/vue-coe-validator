<template>
  <div>
    <section>
      <h1>EXAMPLE 1</h1>
      <form name="form1" @click.prevent>
        <select name="select" v-model="form1.select">
          <option disabled value="">Please select one</option>
          <option></option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>

        <span v-if="$hasError('select')">{{ $hasError('select') }}</span>
        <!-- <c-select
          display="slug"
          display-by="name"
          placeholder="Selecione uma opção"
          :validation="form1.select.length >= 3 && `Máximo de 3 opções selecionadas`"
          multiple
          :items="items"
          v-model="form1.select"
        /> -->
        <c-input
          label="Razão social"
          name="name"
          :validation="$hasError('name')"
          v-validator="{ required: true }"
          v-model="form1.name"
        />

        <c-input
          label="E-mail"
          name="email"
          :validation="$hasError('email')"
          v-validator="{ required: true, pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i }"
          v-model="form1.email"
        />

        <c-input
          label="Cnpj"
          name="registry_code"
          :validation="$hasError('registry_code')"
          v-model="form1.registry_code"
        />

        <c-input
          label="Telefone"
          name="phone"
          :validation="$hasError('phone')"
          v-model="form1.phone"
        />

        <c-input
          label="Cep"
          name="zipcode"
          :validation="$hasError('zipcode', 'form1')"
          v-model="form1.zipcode"
        />

        <c-input
          label="Número"
          name="number"
          :validation="$hasError('number', 'form1')"
          v-model="form1.number"
        />

        <c-input
          label="Complemento"
          name="additional_details"
          v-model="form1.additional_details"
        />

        <c-input
          label="Bairro"
          name="neighborhood"
          :validation="$hasError('neighborhood', 'form1')"
          v-model="form1.neighborhood"
        />

        <c-input
          label="Cidade"
          name="city"
          :validation="$hasError('city', 'form1')"
          v-model="form1.city"
        />

        <c-input
          label="Estado"
          name="state"
          :validation="$hasError('state', 'form1')"
          v-model="form1.state"
        />

        <c-input
          label="Observações"
          name="description"
          v-model="form1.description"
        />

        <button @click="$validator.touch('name2', 'form2')">Touch Field</button>
        <button @click="$validator.validateField('name')">Validate NAME Field</button>
        <button @click="$validator.validateForm('form1')">Validate FORM1 Form</button>
        <button @click="removeField">Remove Field</button>
        <button @click="addField">Add Field</button>
        <button @click="$validator.resetField('name')">Reset NAME Field</button>
        <button @click="$validator.resetForm('form1')">Reset FORM1 Form</button>
        <button @click="submit">Salvar</button>
      </form>

      <form name="form2" @click.prevent>
        <c-input
          label="Razão social"
          name="name2"
          :validation="$hasError('name2', 'form2')"
          v-validator="{ required: true }"
          v-model="form2.name2"
        />

        <c-input
          label="E-mail"
          name="email2"
          :validation="$hasError('email2', 'form2')"
          v-validator="{ required: true, pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i }"
          v-model="form2.email2"
        />
      </form>
    </section>

    <button @click="isOpen = !isOpen">OPEN FORM BOLADAO</button>
    <c-modal :is-open="isOpen" @close="isOpen = !isOpen">
      <form name="form3" @click.prevent>
        <c-input
          label="Razão social"
          name="name3"
          :validation="$hasError('name3', 'form3')"
          v-validator="{ required: true }"
          v-model="form3.name3"
        />

        <c-input
          label="E-mail"
          name="email3"
          :validation="$hasError('email3', 'form3')"
          v-validator="{ required: true, pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i }"
          v-model="form3.email3"
        />
      </form>
    </c-modal>
  </div>
</template>

<script>
// import CSelect from 'vue-coe-select'
import CInput from './components/CInput.vue'
import CModal from './components/CModal/index.js'

import { formSetup } from '../src/index.js'

export default {
  name: 'init-form1',
  components: { CInput, CModal },
  mixins: [ formSetup ],
  data () {
    return {
      isOpen: false,
      form1: {
        // select: { slug: 'slug_boladao2', name: 'coe2' },
        select: '',
        name: '',
        email: '',
        registry_code: '123',
        phone: '',
        zipcode: '',
        number: '',
        additional_details: '',
        neighborhood: '',
        city: '',
        state: '',
        description: ''
      },
      form2: {
        name2: '',
        email2: '',
        registry_code2: '',
        phone2: '',
        zipcode2: '',
        number2: '',
        additional_details2: '',
        neighborhood2: '',
        city2: '',
        state2: '',
        description2: ''
      },
      form3: {
        name3: '',
        email3: ''
      },
      coe: '',
      blz: '?'
    }
  },
  validation: {
    form1: {
      email: {
        required: true,
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
      },
      registry_code: {
        required: true,
        custom: [
          (value) => value === '123',
          (value) => typeof value === 'string'
        ]
      },
      phone: {
        required: true,
        customAsync: [
          value => new Promise(resolve => setTimeout(() => {
            resolve(value === '64')
          }, 2000)),
          value => new Promise(resolve => setTimeout(() => {
            resolve(typeof value === 'string')
          }, 3000))
        ]
      },
      zipcode: {
        required: true
      },
      number: {
        required: true
      },
      neighborhood: {
        required: true
      },
      city: {
        required: true
      },
      state: {
        required: true
      }
    },
    form2: {
      name2: {
        required: true
      },
      email2: {
        required: true,
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
      }
    }
    // form3: {
    //   name3: {
    //     required: true
    //   },
    //   email3: {
    //     required: true,
    //     pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
    //   }
    // }
  },
  messages: {
    form1: {
      name: {
        required: 'não pode ser vazio!'
      },
      phone: {
        customAsync: 'errouuu!'
      }
    },
    form2: {
      name2: {
        required: 'tá vazio rapá'
      }
    }
    // form3: {
    //   name3: {
    //     required: 'tá vazio rapá'
    //   }
    // }
  },
  methods: {
    removeField () {
      delete this.validations.form1
    },
    addField () {
      // add new field
      this.form1 = {
        ...this.form1,
        coe: 'mané'
      }
      // create validation for new field
      const validations = {
        coe: { required: true },
        select: { required: true }
      }
      // set validation for new field
      this.$validator.add(validations, 'form1')
    },
    submit () {
      this.$validator.isFormValid()
        .then(isValid => console.log(isValid))
    },
    validateField (key) {
      this.$validator.validateField(key)
    },
    validateForm (form) {
      this.$validator.validateForm(form)
    }
  }
}
</script>