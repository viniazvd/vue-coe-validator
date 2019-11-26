<template>
  <form name="form" @click.prevent>
    <c-input
      label="Razão social"
      name="name"
      :validation="$hasError('name')"
      v-validator="{ required: true }"
      v-model="form.name"
    />

    <c-input
      label="E-mail"
      name="email"
      :validation="$hasError('email')"
      v-validator="{ required: true, pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i }"
      v-model="form.email"
    />

    <button @click="$validator.validateForm('form')">Validate</button>
  </form>
</template>

<script>
import CInput from './CInput.vue'
import CModal from './CModal/index.js'

import { formSetup } from '../../src/index.js'

export default {
  name: 'form-example-2',

  components: { CInput, CModal },

  mixins: [ formSetup ],

  props: { form: Object },

  validation: {
    form: {
      email: {
        required: true,
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
      }
    }
  },

  messages: {
    form: {
      name: {
        required: 'não pode ser vazio!'
      }
    }
  }
}
</script>