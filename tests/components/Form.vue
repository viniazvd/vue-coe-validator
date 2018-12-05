<template>
  <section>
    <form name="form1">
      <input
        name="name"
        v-model="form1.name"
      />

      <input
        name="email"
        v-model="form1.email"
      />
    </form>
  </section>
</template>

<script>
export default {
  name: 'init-form1',

  data () {
    return {
      isOpen: false,
      form1: {
        name: 'coe',
        email: '',
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
      name: {
        required: true,
        alphabetic: true
      },
      email: {
        required: true,
        pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
      }
    }
  }
}
</script>
