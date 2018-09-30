import { mutateMessages } from '../utils'

const formSetup = {
  mounted () {
    const { validation } = this.$options
    const { messages } = this.$options

    this.messages = messages || null

    if (validation) {
      // overrides default messages based on global message options
      if (this.$validator.messages && this.messages && this.messages.length) mutateMessages(this.messages, this.$validator.messages)

      Object
        .entries(this.$data)
        .find(([ keyForm, valueForm ]) => {
          Object.entries(validation).find(([keyValidation, objectValidations]) => {
            if (keyForm === keyValidation) {
              for (const input in valueForm) {
                this.$watch(keyForm.concat('.', input), value => {
                  this.validations = this.$validator.validate(
                    this.validations,
                    this.messages,
                    keyForm,
                    input,
                    value
                  )
                })
              }
              this.validations = {
                ...this.validations,
                ...this.$validator.init(objectValidations, keyForm)
              }
            }
          })
        })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the data')
    }

    this.$validator.setListenersTouch.call(this, this.validations, this.messages)
  },

  data () {
    return {
      validations: {},
      messages: {}
    }
  },

  methods: {
    $hasError (key, form) {
      if (this.validations && Object.keys(this.validations).length) {
        const input = this.validations[form][key]

        return input && input.isTouched && !input.isValid && input.errors[0]
      }

      return false
    },

    $resetValidations (form) {
      const defaultState = {
        isTouched: false,
        isDirty: false,
        isFilled: false,
        isValid: false,
        errors: []
      }

      const initialForm = {
        [form]: Object.entries(this.validations[form]).reduce((form, [key]) => {
          form[key] = { ...defaultState }

          return form
        }, {})
      }

      this.validations = initialForm
      // this.$validator.unsetListenersTouch.call(this, this.validations, this.messages)
    },

    $isValidForm (form) {
      const isValid = Object
        .entries(this.validations[form])
        .every(([_, { isValid }]) => isValid)

      return isValid
    }
  }

  // beforeDestroy () {
  //   this.$validator.unsetListenersTouch.call(this, this.validations, this.messages)
  // }
}

export default formSetup
