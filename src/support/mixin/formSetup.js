const formSetup = {
  mounted () {
    const validation = this.$options.validation

    if (validation && validation.data) {
      const { data, rules } = validation

      Object
        .entries(data)
        .map(([ key, value ]) => ({ key, value }))
        .find(({ key, value }) => {
          Object.entries(rules).find(([keyRule, valueRule]) => {
            if (key === keyRule) {
              this.$init(value, valueRule, key)
            }
          })
        })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the data')
    }

    // dynamically records listeners to activate touch inputs
    const forms = this.$el.querySelectorAll('form[name]')
    if (forms.length) {
      forms.forEach(form => {
        Array.from(form.elements).forEach((element, index) => {
          form[index].addEventListener('blur', () => this.$touch(element.name, form.name), true)
        })
      })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the form')
    }

    // this.$watch('input2', value => {
    //   console.log('value', value)
    // }, { deep: true })
  },

  data () {
    return {
      forms: {},
      initialForm: {}
    }
  }
}

export default formSetup
