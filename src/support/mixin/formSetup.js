import { setMessages, setFormValidations, setWatcher } from '../utils'

const formSetup = {
  mounted () {
    const { validation } = this.$options
    const { messages } = this.$options

    this.messages = messages || null

    if (validation) {
      // overrides default messages based on global message options
      if (this.$validator.messages && this.messages && this.messages.length) setMessages(this.messages, this.$validator.messages)

      const { validations = {}, messages = {}, ...data } = this.$data

      Object.entries(data).forEach(([dataKey, dataValue]) => {
        Object.keys(validation).forEach(validationKey => {
          if (validationKey === dataKey) {
            for (const input in dataValue) setWatcher.call(this, dataKey, input)

            this.validations = setFormValidations.call(this, validation[dataKey], dataKey)
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
