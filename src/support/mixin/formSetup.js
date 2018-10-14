import { setMessages, setValidations } from '../services'

const formSetup = {
  mounted () {
    const { validation } = this.$options
    const { messages } = this.$options

    this.messages = messages || null

    if (validation) {
      // overrides default messages based on global message options
      if (this.$validator.messages && this.messages && this.messages.length) setMessages(this.messages, this.$validator.messages)

      setValidations.call(this, validation)
    } else {
      console.warn('follow the instructions in the documentation to correctly register the data')
    }
  },

  data () {
    return {
      validations: {},
      messages: {}
    }
  },

  methods: {
    $handlerBlur (form, element) {
      this.validations = {
        ...this.validations,
        ...this.$validator.touch(this.validations, this.messages, form, element.name, element.value)
      }
    },

    $hasError (key, form) {
      if (this.validations && Object.keys(this.validations).length) {
        const input = this.validations[form][key]

        return input && input.isTouched && !input.isValid && input.errors[0]
      }

      return false
    },

    $resetValidations (form) {
      const { validation } = this.$options

      // overwrites the initial validations
      setValidations.call(this, validation, form)
    },

    $isValidForm (form) {
      const isValid = Object
        .entries(this.validations[form])
        .every(([_, { isValid }]) => isValid)

      return isValid
    }
  }
}

export default formSetup
