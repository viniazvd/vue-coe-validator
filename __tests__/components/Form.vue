<template>
  <div id="app">
    <section>
      <form name="form1">
        <select name="select" v-model="form1.select">
          <option disabled value="">Please select one</option>
          <option></option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>

        <span v-if="$hasError('select')">{{ $hasError('select') }}</span>

        <input
          name="name"
          v-validator="{ required: true }"
          v-model="form1.name"
        />

        <input
          name="email"
          v-validator="{ required: true, pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i }"
          v-model="form1.email"
        />

        <input
          name="registry_code"
          v-model="form1.registry_code"
        />

        <input
          name="phone"
          v-model="form1.phone"
        />

        <input
          name="zipcode"
          v-model="form1.zipcode"
        />

        <input
          name="number"
          v-model="form1.number"
        />

        <input
          name="additional_details"
          v-model="form1.additional_details"
        />

        <input
          name="neighborhood"
          v-model="form1.neighborhood"
        />

        <input
          name="city"
          v-model="form1.city"
        />

        <input
          name="state"
          v-model="form1.state"
        />

        <input
          name="description"
          v-model="form1.description"
        />
      </form>

      <form name="form2">
        <input
          name="name2"
          v-validator="{ required: true }"
          v-model="form2.name2"
        />

        <input
          name="email2"
          v-validator="{ required: true, pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i }"
          v-model="form2.email2"
        />
      </form>
    </section>
  </div>
</template>

<script>
// mixins
import { formSetup } from '../../src/index.js'

export default {
  name: 'init-form1',

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
      coe: '',
      blz: '?'
    }
  },

  validation: {
    form1: {
      input1: {
        required: true,
        alphabetic: true
      },
      input2: {
        required: true,
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
      },
      input3: {
        required: true,
        custom: [
          (value) => value === '123',
          (value) => typeof value === 'string'
        ]
      }
    }
  }
}
</script>
