const formSetup = {
  mounted () {
    const { validation } = this.$options

    if (validation) {
      Object
        .entries(this.$data)
        .find(([ keyForm, valueForm ]) => {
          Object.entries(validation).find(([keyValidation, objectValidations]) => {
            if (keyForm === keyValidation) {
              for (const input in valueForm) {
                this.$watch(keyForm.concat('.', input), value => {
                  this.validations = this.$validate(this.validations, keyForm, input, value)
                })
              }
              this.validations = { 
                ...this.validations, 
                ...this.$init(objectValidations, keyForm) 
              }
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
          form[index].addEventListener('blur', () =>
            (
              this.validations = {
                ...this.validations,
                ...this.$touch(this.validations, form.name, element.name, element.value)
              }
            ), 
          { once: true })
        })
      })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the form')
    }
  },

  data () {
    return {
      validations: {}
    }
  },

  methods: {
    $hasError (key, form) {
      if (this.validations && Object.keys(this.validations).length) {
        const input = this.validations[form][key]

        return input.isTouched && !input.isValid && input.errors[0]
      }

      return false   
    }
  }
}

export default formSetup
